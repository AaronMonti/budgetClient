'use sever'

import { signOut } from "next-auth/react"

export async function exitSession() {
  await signOut({ callbackUrl: '/login' })
}