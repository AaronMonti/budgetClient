import axios from "axios";
import { useSession } from "next-auth/react";

export async function GetExpenses() {
  const { data: session, status } = useSession();
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/expense`, {
    headers: {
      authorization: `Bearer ${session?.user?.token}`
    },
  })

  return res.data
}