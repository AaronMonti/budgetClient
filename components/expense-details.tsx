'use client'

interface CardProps {
  data: {}
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { badgeVariants } from "@/components/ui/badge"

export function formatearFecha(date) {
  // Crear un objeto de fecha a partir de la cadena proporcionada
  const fecha = new Date(date);

  // Definir los nombres de los meses
  const nombresMeses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  // Obtener los componentes de la fecha
  const dia = fecha.getDate();
  const mes = nombresMeses[fecha.getMonth()];
  const año = fecha.getFullYear();

  // Formatear la fecha en el formato deseado
  const fechaFormateada = `${dia} de ${mes} de ${año}`;

  return fechaFormateada;
}


export default function DetailsCard({ data }: CardProps) {

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{data.description}</CardTitle>
          <CardDescription>{formatearFecha((data.date))}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Monto gastado: {data.amount}</p>
          <p>Monto por cada uno: {data.amountByParticipant}</p>
        </CardContent>
        <CardFooter>
          <Badge>{data.category}</Badge>
        </CardFooter>
      </Card>
    </div>
  )
}