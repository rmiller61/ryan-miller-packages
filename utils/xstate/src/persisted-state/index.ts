import type {
  EventObject,
  StateMachine,
  StateSchema,
  State,
  ResolveTypegenMeta,
  TypegenDisabled,
  NoInfer,
  BaseActionObject,
  ServiceMap,
} from "xstate"

export const getPersistedStateKey = (key: string) => `${key.toLowerCase()}StateConfig`

export function rehydrate<C, S extends StateSchema, E extends EventObject>(
  key: string,
  machine: StateMachine<C, S, E>
) {
  if (typeof window === "undefined") {
    return machine.initialState
  }
  const item = localStorage.getItem(key)
  return item ? (JSON.parse(item) as typeof machine.initialState) : machine.initialState
}

export function storePersistedState<C, S extends StateSchema, E extends EventObject>(
  key: string,
  state: State<
    C,
    E,
    S,
    {
      value: any
      context: C
    },
    ResolveTypegenMeta<TypegenDisabled, NoInfer<E>, BaseActionObject, ServiceMap>
  >
) {
  localStorage.setItem(key, JSON.stringify(state))
}
