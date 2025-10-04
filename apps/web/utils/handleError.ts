import { AxiosError } from 'axios'

export const handleError = (
    error?: unknown,
    defaultErrorMessage = 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
  ) => {
  let errorMessage = defaultErrorMessage
  if (error && (error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError<{ error?: string; message?: string }>
    errorMessage =
      axiosError.response?.data?.error ||
      axiosError.response?.data?.message ||
      errorMessage
  }

  return errorMessage
}