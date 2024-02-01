"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios";
import { getSession, useSession } from "next-auth/react"
import { format } from "date-fns"
import { es } from 'date-fns/locale';

import { CalendarIcon, CircleDollarSign, PenLine, Pencil } from "lucide-react"

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
import { toast } from "sonner"
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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

export default function UpdateExpense({ expense }: any) {
  const { data: session } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: expense.description,
      date: new Date(expense.date),
      amount: expense.amount !== undefined ? expense.amount.toString() : undefined,
      category: expense.category,
      expenseOwner: expense.expenseOwner,
      participants: expense.participants[0]._id,
    },
  })

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
        {
          headers: {
            authorization: `Bearer ${session?.accessToken}`
          }
        })
      setUsers(res.data)
      setIsLoading(false)
    }
    getUsers()
  }, [])


  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="h-8 w-8 p-0"><PenLine className="h-5 w-5" /></Button>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Gasto</DialogTitle>
        </DialogHeader>
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
                    <div className="relative flex items-center">
                      <CircleDollarSign className="absolute left-2 text-gray-500" />
                      <Input placeholder="Monto" type="number" {...field} className="pl-9" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" onClick={() => {
                onSubmit(form.getValues())
              }}>Actualizar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  )

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const session = await getSession()
    const userId = session?.user?.userId
    console.log('entre')
    console.log(expense)
    console.log(values)
    const datos = async () => {
      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/expense/${expense._id}`,
          {
            description: values.description,
            date: values.date,
            amount: values.amount,
            category: values.category,
            expenseOwner: userId,
            participants: values.participants,
          },
          {
            headers: {
              authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        return { success: true };
      } catch (error) {
        return { success: false, error };
      }
    };

    toast.promise(datos(), {
      loading: 'Loading...',
      success: (data) => {
        if (data) {
          return 'Expense has been updated successfully';
        }
      },
      error: (error) => {
        return 'Error updated expense';
      },
    });
  }
}
