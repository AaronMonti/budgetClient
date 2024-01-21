import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import DetailsCard from '@/components/expense-details';


export async function getExpense({ id }: { id: string }) { // Asegúrate de tener las opciones de autenticación necesarias
  const session = await getServerSession(authOptions);
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/expense/${id}`, {
      headers: {
        authorization: `Bearer ${session?.user?.token}`,
      },
    });

    const expenseData = res.data;
    return expenseData;
  } catch (error) {
    console.error('Error fetching expense:');
  }
}

export default async function ExpenseDetails({ params }: { params: { id: string } }) {
  const { id } = params;

  const data = await getExpense({ id })

  return (
    <div>
      <DetailsCard data={data} />

    </div>
  )
}
