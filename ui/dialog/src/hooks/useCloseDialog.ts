import { useSetDialog } from "./useSetDialog"

export const useCloseDialog = () => {
  const setDialog = useSetDialog()
  return () => {
    setDialog(false)
  }
}
