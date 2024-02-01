import ExpenseForm from "@/components/expense-form";

export default async function CreateExpense() {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-5">Crear gasto</h1>
      <ExpenseForm />
    </div>
  )
}