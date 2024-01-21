import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"


export default async function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold">Nuestros gastos</h1>
      <Button variant="default" size="lg" asChild>
        <Link href="/login">Iniciar Sesion</Link>
      </Button>
      <Button variant="default" size="lg" asChild>
        <Link href="/register">Registrarse</Link>
      </Button>
    </main>
  )
}
