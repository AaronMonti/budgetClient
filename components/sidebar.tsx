'use client'

import NavLinks from '@/components/nav-links'
import { LogOut } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useSession } from 'next-auth/react';
import { exitSession } from '@/lib/actions';
import { ModeToggle } from './theme-toggle';
import { Separator } from './ui/separator';
import { Button } from './ui/button';


export default function Navbar() {
  /* const session = await getServerSession(); */
  const { data: session } = useSession();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 shadow-md">
      <div
        className="mb-2 flex h-20 justify-start rounded-md bg-background p-4 md:h-40"
      >
        <div className="w-full flex flex-row-reverse items-center md:items-start md:flex-col justify-between">
          <ModeToggle />
          <div className='flex flex-row items-center gap-2'>
            <div className='text-foreground font-bold text-xl'>{session?.user?.name}</div>
          </div>
        </div>
      </div>
      <Separator className='mb-5' />
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form action={exitSession}>
          <Button variant={"destructive"} className="flex justify-start w-full text-left">
            <LogOut className="w-5" />
            <span className="p-2 hidden md:block">Cerrar Sesion</span>
          </Button>
        </form>
      </div>
    </div>
  );
}