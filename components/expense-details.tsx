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

export default function DetailsCard({ data }: CardProps) {

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{data.description}</CardTitle>
          <CardDescription>{data.date}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Amount: {data.amount}</p>
        </CardContent>
        <CardFooter>
          <Badge>{data.category}</Badge>
        </CardFooter>
      </Card>
    </div>
  )
}