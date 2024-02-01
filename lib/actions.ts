'use sever'

import { getSession, signOut } from "next-auth/react"
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function exitSession() {
  await signOut({ callbackUrl: '/login' })
}

export async function deleteExpense(id: string) {
  const session = await getSession(authOptions as object)
  console.log(session)

  await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/expense/${id}`, {
    headers: {
      authorization: `Bearer ${session?.accessToken}`
    }
  })
}