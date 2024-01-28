import { Footer } from '@/components'
import './globals.css'
import type { Metadata } from 'next'
import React from "react";
import { UserContextProviderClass } from '@/context/Context'



export const metadata: Metadata = {
  title: 'SeBcO admin',
  description: '',
    icons: '/SEBCOTOGO.png'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  // @ts-ignore
    return (
    <html lang="fr">
      <body className=''>

       <UserContextProviderClass>
           {children}
           <Footer/>
       </UserContextProviderClass>


      </body>
      
    </html>
  )
}
