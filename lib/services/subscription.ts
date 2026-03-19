"use server"
import { fetchAPI } from "@/lib/api-client"
import { ApiResponse } from "./services.interfaces"
import { Subscription } from "@/models/subscription.models"
import { ApiError, ValidationError } from "./api-error"

const createSubscription = async () => {
  try {
    const response = await fetchAPI<ApiResponse<Subscription>>(
      "/api/subscription/create",
      { method: "POST" }
    )
    return response.data
  } catch (error) {
    console.error("Error creating subscription:", error)
  }
}

const activateSubscription = async (subscriptionToken: string) => {
  try {
    if (!subscriptionToken) {
      throw new ApiError("Subscription token is required")
    }
    const response = await fetchAPI<ApiResponse<Subscription>>(
      "/api/subscription/activate",
      {
        method: "POST",
        headers: new Headers({
          "x-subscription-token": subscriptionToken,
        }),
      }
    )
    return response.data
  } catch (error) {
    console.error("Error activating subscription:", error)
  }
}

const deactivateSubscription = async (subscriptionToken: string) => {
  try {
    if (!subscriptionToken) {
      throw new ApiError("Subscription token is required")
    }
    const response = await fetchAPI<ApiResponse<Subscription>>(
      "/api/subscription",
      {
        method: "DELETE",
        headers: new Headers({
          "x-subscription-token": subscriptionToken,
        }),
      }
    )
    return response.data
  } catch (error) {
    console.error("Error deactivating subscription:", error)
  }
}

const getSubscriptionStatus = async (subscriptionToken: string) => {
  try {
    if (!subscriptionToken) {
      throw new ApiError("Subscription token is required")
    }
    const response = await fetchAPI<ApiResponse<Subscription>>(
      "/api/subscription",
      {
        method: "GET",
        headers: new Headers({
          "x-subscription-token": subscriptionToken,
        }),
      }
    )
    return response.data
  } catch (error) {
    console.error("Error getting subscription status:", error)
  }
}
