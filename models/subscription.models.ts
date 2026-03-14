export interface Subscription {
  status: "inactive" | "active"
  createdAt: string
  subscribedAt: string
  updatedAt: string
  token: string
}
