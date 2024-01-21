'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"

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
          Date
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
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "amount",
    header: "Amount",
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(expense._id)}
            >
              Copy expense ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem><Link href={`/dashboard/expenses/${expense._id}`}>View expense details</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

];