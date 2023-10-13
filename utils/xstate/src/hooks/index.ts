import { rehydrate, storePersistedState, getPersistedStateKey } from "../persisted-state"
import { useInterpret, useActor } from "@xstate/react"
import type { EventObject, StateMachine, StateSchema, StateFrom, InterpreterOptions } from "xstate"

export function usePersistentMachine<C, S extends StateSchema, E extends EventObject>(
  machine: StateMachine<C, S, E>,
  hasStateChanged: (state: StateFrom<StateMachine<C, S, E>>) => boolean = (state) =>
    state.changed ?? false,
  options: InterpreterOptions = {},
  observer: (value: StateFrom<StateMachine<C, S, E>>) => void = () => {}
) {
  const key = getPersistedStateKey(machine.key)
  const service = useInterpret(
    machine,
    {
      state: rehydrate(key, machine),
      ...options,
    },
    (state) => {
      if (hasStateChanged(state)) storePersistedState(key, state)
      observer(state)
    }
  )
  const [state, send] = useActor(service)
  return [state, send, service] as const
}
