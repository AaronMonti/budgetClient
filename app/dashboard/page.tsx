import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DataCharts from "@/components/data-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = async () => {
  const session = await getServerSession(authOptions)

  const monthlyExpenses = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/monthly-expenses`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${session?.user?.token}`
    },
  })

  const monthlyExpensesData = monthlyExpenses.data

  const formatCurrency = (amount: number) => {
    // Formatear el número y agregar el símbolo de dólar
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const chartOptions = {
    responsive: true,
  }

  const labels = monthlyExpensesData.labels

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total',
        data: monthlyExpensesData.data,
        backgroundColor: 'rgba(255, 99, 132)',
      }
    ]
  }

  console.log(monthlyExpensesData.data)

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Dashboard</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Monthly expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <DataCharts type={"bar"} data={chartData} options={chartOptions} />
        </CardContent>
      </Card>
    </div>
  );
};
export default Dashboard;