"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios";
import { getSession, useSession } from "next-auth/react"
import { format } from "date-fns"
import { es } from 'date-fns/locale';

import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const formSchema = z.object({
  description: z.string().min(3),
  date: z.date(),
  amount: z.string().transform((str) => parseFloat(str)),
  category: z.string(),
  expenseOwner: z.string(),
  participants: z.string(),
})

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  expenses: string;
}

export default function ExpenseForm() {
  const { data: session } = useSession()
  console.log(session)
  const [users, setUsers] = useState<User[]>([])
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      date: new Date(),
      amount: undefined,
      category: "",
      expenseOwner: "",
      participants: "",
    },
  })

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
        {
          headers: {
            authorization: `Bearer ${session?.user?.token}`
          }
        })
      setUsers(res.data)
    }
    getUsers()
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Input placeholder="Descripcion" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: es })
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Selecciona la fecha del gasto
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Verduleria">Verduleria 🍎</SelectItem>
                  <SelectItem value="Supermercado">Supermercado 🛒</SelectItem>
                  <SelectItem value="Gustos">Gustos 🍔</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Participantes</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona participantes" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user._id} value={user._id}>
                      {user.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto</FormLabel>
              <FormControl>
                <Input placeholder="Monto" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const session = await getServerSession(authOptions)
    const userId = session?.user?.userId
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/expense`, {
      description: values.description,
      date: values.date,
      amount: values.amount,
      category: values.category,
      expenseOwner: userId,
      participants: values.participants,
    },
      {
        headers: {
          authorization: `Bearer ${session?.user?.token}`
        }
      })

    console.log(values)
  }
}
