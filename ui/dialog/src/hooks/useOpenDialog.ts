import { useSetDialog } from "./useSetDialog"

export const useOpenDialog = () => {
  const setDialog = useSetDialog()
  return () => {
    setDialog(true)
  }
}
