"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { SubscriptionService } from "@/lib/services/subscription"
import { SUBSCRIPTION_COOKIE } from "@/lib/constants"

export async function subscribeAction() {
  const cookieStore = await cookies()
  const existingToken = cookieStore.get(SUBSCRIPTION_COOKIE)?.value

  let shouldCreateToken = !existingToken

  try {
    if (existingToken) {
      try {
        const currentStatus =
          await SubscriptionService.getSubscriptionStatus(existingToken)

        if (currentStatus.status === "active") {
          return { isSubscribed: true }
        }
        shouldCreateToken = true
      } catch {
        shouldCreateToken = true
      }
    }

    if (shouldCreateToken) {
      // If no token exists, create a new subscription and persist it in session cookie.
      const createdSubscription = await SubscriptionService.createSubscription()
      cookieStore.set(SUBSCRIPTION_COOKIE, createdSubscription.token, {
        path: "/",
        sameSite: "lax",
      })
    }
  } catch (error) {
    console.error("Error subscribing user:", error)
    return { isSubscribed: false }
  }

  revalidatePath("/")
  revalidatePath("/articles")
  return { isSubscribed: true }
}

export async function getSubscriptionAction() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SUBSCRIPTION_COOKIE)?.value

  if (!token) {
    return { token: null, isSubscribed: false }
  }

  return { token, isSubscribed: true }
}

export async function unsubscribeAction() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SUBSCRIPTION_COOKIE)?.value

  if (!token) {
    return { isSubscribed: false }
  }

  try {
    await SubscriptionService.deactivateSubscription(token)
  } catch (error) {
    console.error("Error unsubscribing user:", error)
  } finally {
    cookieStore.delete(SUBSCRIPTION_COOKIE)
  }
  return { isSubscribed: false }
}
