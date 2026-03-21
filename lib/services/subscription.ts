"use server"
import { fetchAPI } from "@/lib/api-client"
import { ApiResponse, ERROR_CODE } from "./services.interfaces"
import { Subscription } from "@/models/subscription.models"
import { ApiError, NotFoundError, ValidationError } from "./api-error"

type SubscriptionMethod = "GET" | "POST" | "DELETE"

interface SubscriptionRequestOptions {
  url: string
  method: SubscriptionMethod
  subscriptionToken?: string
}

const callSubscriptionApi = async <T>({
  url,
  method,
  subscriptionToken,
}: SubscriptionRequestOptions) => {
  try {
    if (method !== "POST" && !subscriptionToken) {
      throw new ValidationError("Subscription token is required")
    }

    const headers = subscriptionToken
      ? new Headers({ "x-subscription-token": subscriptionToken })
      : undefined

    const response = await fetchAPI<ApiResponse<T>>(url, { method, headers })

    if (!response.success && response.error) {
      if (response.error.code === ERROR_CODE.NOT_FOUND) {
        throw new NotFoundError(response.error.message)
      }
      throw new ApiError(response.error.message)
    }

    return response.data
  } catch (error) {
    console.error(`Error in ${method} ${url}:`, error)
    throw error
  }
}

const createSubscription = () =>
  callSubscriptionApi<Subscription>({
    url: "/api/subscription/create",
    method: "POST",
  })

const activateSubscription = (token: string) =>
  callSubscriptionApi<Subscription>({
    url: "/api/subscription/activate",
    method: "POST",
    subscriptionToken: token,
  })

const deactivateSubscription = (token: string) =>
  callSubscriptionApi<Subscription>({
    url: "/api/subscription",
    method: "DELETE",
    subscriptionToken: token,
  })

const getSubscriptionStatus = (token: string) =>
  callSubscriptionApi<Subscription>({
    url: "/api/subscription",
    method: "GET",
    subscriptionToken: token,
  })

export const SubscriptionService = {
  createSubscription,
  activateSubscription,
  deactivateSubscription,
  getSubscriptionStatus,
}
