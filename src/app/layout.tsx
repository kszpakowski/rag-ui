import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import UserButton from '@/components/UserButton'
import { auth } from "@/auth"
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'GTC RAG',
  description: 'Ask questions over Terms and Conditions documents',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await auth()

  return (
    <html lang="en">
      <body className="font-mono">
        <div className='flex w-full py-2 border-b justify-center sticky top-0 bg-gray-300 dark:bg-black z-40'>
          <div className='flex w-5/6 justify-between items-center'>
            <div className='space-x-6'>
              <Link className="text-xl" href='/'>GTC RAG</Link>
              {session &&
                <>
                  <Link href='/ask'>Ask</Link>
                  <Link href='/documents-library'>Library</Link>
                </>}
            </div>
            <div className='self-end'>
              <UserButton />
            </div>
          </div>

        </div>
        <main className="flex w-full min-h-screen max-h-screen p-8 md:p-24 md:pt-8 justify-center">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}
