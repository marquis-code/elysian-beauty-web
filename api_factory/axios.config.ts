import axios, { type AxiosResponse } from "axios"
import { useUser } from "~/composables/auth/useUser"
import { useCustomToast } from "@/composables/core/useCustomToast"

const { token, logOut } = useUser()
const { showToast } = useCustomToast() // Move useCustomToast call outside the interceptor

const $GATEWAY_ENDPOINT_WITHOUT_VERSION = import.meta.env.VITE_BASE_URL as string
const $GATEWAY_ENDPOINT = import.meta.env.VITE_BASE_URL
const $GATEWAY_ENDPOINT_V2 = import.meta.env.VITE_BASE_URL + "/v2"
const $IMAGE_UPLOAD_ENDPOINT = import.meta.env.VITE_IMAGE_UPLOAD_BASE_URL as string

export const GATEWAY_ENDPOINT = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
})

export const GATEWAY_ENDPOINT_V2 = axios.create({
  baseURL: $GATEWAY_ENDPOINT_V2,
})

export const GATEWAY_ENDPOINT_WITH_AUTH = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
})

export const GATEWAY_ENDPOINT_WITH_AUTH_FORM_DATA = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
  headers: {
    Authorization: `Bearer ${token.value}`,
    "Content-Type": "multipart/form-data",
  },
})

export const GATEWAY_ENDPOINT_WITHOUT_VERSION = axios.create({
  baseURL: $GATEWAY_ENDPOINT_WITHOUT_VERSION,
})
export const GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH = axios.create({
  baseURL: $GATEWAY_ENDPOINT_WITHOUT_VERSION,
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
})
export const IMAGE_UPLOAD_ENDPOINT = axios.create({
  baseURL: $IMAGE_UPLOAD_ENDPOINT,
})
export interface CustomAxiosResponse extends AxiosResponse {
  value?: any
  type?: string
}

const instanceArray = [
  GATEWAY_ENDPOINT,
  GATEWAY_ENDPOINT_V2,
  GATEWAY_ENDPOINT_WITH_AUTH,
  GATEWAY_ENDPOINT_WITHOUT_VERSION,
  GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH,
]

instanceArray.forEach((instance) => {
  instance.interceptors.request.use((config: any) => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  })

  instance.interceptors.response.use(
    (response: CustomAxiosResponse) => {
      return response
    },
    (err: any) => {
      // Check for CORS errors first
      const isCORSError =
        // No response typically indicates a CORS or network error
        !err.response &&
        // Check for explicit CORS mentions in the message
        ((err.message &&
          (err.message.includes("CORS") ||
            err.message.includes("Cross-Origin") ||
            err.message.includes("cross-origin") ||
            err.message.toLowerCase().includes("access-control-allow-origin"))) ||
          // Network errors are often CORS related
          err.message?.includes("Network Error") ||
          // Axios specific error for canceled requests (which can be due to CORS)
          err.code === "ERR_NETWORK" ||
          // Check if it's a TypeError with specific CORS-related messages
          (err instanceof TypeError &&
            (err.message?.includes("Failed to fetch") || err.message?.includes("NetworkError"))))

      if (isCORSError) {
        // console.error("CORS Error:", err)
        showToast({
          title: "CORS Error",
          message: "Unable to connect to the server due to cross-origin restrictions. Please contact support.",
          toastType: "error",
          duration: 5000,
        })
        return {
          type: "ERROR",
          data: {
            message: "CORS Error: Cross-origin request blocked",
            error: "CORS policy violation",
          },
        }
      }

      // Continue with existing error handling
      if (typeof err.response === "undefined") {
        showToast({
          title: "Error",
          message: "kindly check your network connection",
          toastType: "error",
          duration: 3000,
        })
        return {
          type: "ERROR",
          ...err.response,
        }
      }
      if (err.response.status === 401) {
        console.log(err.response.data.error)
        logOut()
        showToast({
          title: "Error",
          message: err?.response?.data?.message || err?.response?.data?.error || "An error occured",
          toastType: "error",
          duration: 3000,
        })
        return {
          type: "ERROR",
          ...err.response,
        }
      } else if (statusCodeStartsWith(err.response.status, 4)) {
        if (err.response.data.message) {
          showToast({
            title: "Error",
            message: err?.response?.data?.message || err?.response?.data?.error || "An error occured",
            toastType: "error",
            duration: 3000,
          })
        }
        return {
          type: "ERROR",
          ...err.response,
        }
      } else if (err.response.status === 500) {
        showToast({
          title: "Error",
          message: err?.response?.data?.message || err?.response?.data?.error || "An error occured",
          toastType: "error",
          duration: 3000,
        })
        return {
          type: "ERROR",
          ...err.response,
        }
      } else if (err.response.status === 409) {
        showToast({
          title: "Error",
          message: err?.response?.data?.message || err?.response?.data?.error || "An error occured",
          toastType: "error",
          duration: 3000,
        })
        return {
          type: "ERROR",
          ...err.response,
        }
      }

      // Catch any other errors that weren't handled above
      return {
        type: "ERROR",
        data: {
          message: "An unexpected error occurred",
          error: err.message,
        },
      }
    },
  )
})

const statusCodeStartsWith = (statusCode: number, startNumber: number): boolean => {
  const statusCodeString = statusCode.toString()
  const startNumberString = startNumber.toString()

  return statusCodeString.startsWith(startNumberString)
}

