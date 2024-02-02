import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import axios from "axios";
import { DataTable } from "@/components/data-table";
import { Expense, columns } from "./columns";


export async function GetExpenses() {
  const session = await getServerSession(authOptions as object)
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/expense`, {
      headers: {
        authorization: `Bearer ${session?.accessToken}`
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
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-5">Tabla de gastos</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  )
}