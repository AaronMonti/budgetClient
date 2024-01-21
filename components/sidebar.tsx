'use client'

import Link from 'next/link'
import NavLinks from '@/components/nav-links'
import { LogOut } from 'lucide-react';
import { getServerSession } from 'next-auth';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { signOut, useSession } from 'next-auth/react';
import { exitSession } from '@/lib/actions';


export default function Navbar() {
  /* const session = await getServerSession(); */
  const { data: session } = useSession();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 shadow-md">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/dashboard"
      >
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='text-white'>{session?.user?.name}</div>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form action={exitSession}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <LogOut className="w-6" />
            <div className="hidden md:block">Cerrar Sesion</div>
          </button>
        </form>
      </div>
    </div>
  );
}