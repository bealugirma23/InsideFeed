import { ScreenState } from "../../types/screenState"

type ScreenRendererProps<T> = {
  state: ScreenState<T>
  loading: React.ReactNode
  empty: React.ReactNode
  error: (msg: string) => React.ReactNode
  success: (data: T) => React.ReactNode
}

export function ScreenRenderer<T>({
  state,
  loading,
  empty,
  error,
  success,
}: ScreenRendererProps<T>) {
  switch (state.status) {
    case "loading":
      return loading
    case "error":
      return error(state.message)
    case "empty":
      return empty
    case "success":
      return success(state.data)
    default:
      return null
  }
}
