'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowUpDown, Trash2, Pencil, NotebookText } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { deleteExpense } from "@/lib/actions"
import UpdateExpense from "@/components/update-expense"

export type Expense = {
  _id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  paymentMethod: string;
  participants: string[];
}

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      const formateDate = date.toLocaleDateString()
      return <div className="font-medium">{formateDate}</div>
    }
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descripcion
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoria
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const category: string = row.getValue("category")
      if (category === "Supermercado") {
        return <Badge className="bg-red-700 font-medium">{category}</Badge>
      }
      if (category === "Verduleria") {
        return <Badge className="bg-green-700 font-medium">{category}</Badge>
      }
      if (category === "Gustos") {
        return <Badge className="bg-purple-700 font-medium">{category}</Badge>
      }
      else {
        return <Badge className="font-medium">{category}</Badge>
      }
    }
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formateAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "ARS"
      }).format(amount)

      return <div className="font-medium">{formateAmount}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const expense = row.original
      return (
        <div>
          <div className="flex gap-3">
            <Button className="h-8 w-8 p-0"><Link href={`/dashboard/expenses/${expense._id}`}><NotebookText className="h-5 w-5" /></Link></Button>

            <UpdateExpense expense={expense} />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="h-8 w-8 p-0" variant={"destructive"}><Trash2 className="h-5 w-5" /></Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Esto eliminará permanentemente el gasto.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-destructive hover:text-destructive">Cancelar</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => deleteExpense(expense._id)}>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )
    },
  },


];