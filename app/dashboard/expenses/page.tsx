import { getServerSession } from "next-auth"
import { authOptions } from '../../api/auth/[...nextauth]/route'
import axios from "axios";
import { DataTable } from "@/components/data-table";
import { Expense, columns } from "./columns";


export async function GetExpenses() {
  const session = await getServerSession(authOptions)
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/expense`, {
      headers: {
        authorization: `Bearer ${session?.user?.token}`
      }
    })
    const expensesData = res.data
    return expensesData
  } catch (error) {
    console.log('hola')
  }
}


export default async function Expenses() {
  const data = await GetExpenses()
  return (
    <section>
      <div>
        <h1>Expenses Table</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  )
}