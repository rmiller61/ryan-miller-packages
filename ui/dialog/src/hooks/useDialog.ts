import { DialogContext } from "../constants"
import { useContext } from "react"

export const useDialog = () => {
  return useContext(DialogContext)
}
