import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"


export default async function Home() {
  return (
    <main>
      <div className="h-screen flex flex-col items-center lg:flex-row lg:justify-between">
        <Image src="/us1.png" alt="logo" className="hidden md:block" width={800} height={500} />
        <Image src="/us1.png" alt="logo" className="block md:hidden" width={500} height={300} />
        <div className="lg:h-full flex flex-col items-center justify-center gap-10">
          <h1 className="text-3xl font-bold">Nuestros gastos</h1>
          <div className="flex gap-5">
            <Button variant="default" size="lg" asChild>
              <Link href="/login">Iniciar Sesion</Link>
            </Button>
            <Button variant="default" size="lg" asChild>
              <Link href="/register">Registrarse</Link>
            </Button>
          </div>
          <div></div>
        </div>
        <Image src="/us2.png" alt="logo" className="hidden lg:block" width={800} height={500} />
      </div>

    </main>
  )
}
