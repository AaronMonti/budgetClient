import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DataCharts from "@/components/data-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = async () => {
  const session = await getServerSession(authOptions as object)

  const monthlyExpenses = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/monthly-expenses`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${session?.accessToken}`
    },
  })

  const monthlyExpensesData = monthlyExpenses.data

  const formatCurrency = (amount: number) => {
    // Formatear el número y agregar el símbolo de dólar
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  const labels = monthlyExpensesData.labels

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total',
        data: monthlyExpensesData.data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-5">Resumen</h1>
      <Card>
        <CardHeader>
          <CardTitle>Gastado por mes</CardTitle>
        </CardHeader>
        <CardContent>
          <DataCharts type={"bar"} data={chartData} options={chartOptions} width={500} height={300} />
        </CardContent>
      </Card>
    </div>
  );
};
export default Dashboard;