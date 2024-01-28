import { Header } from '@/components'
import SideBar from '@/components/SideBar'
import React from 'react'

export default function productList() {
  return (
    <div>
      <Header />
      <div className='ml-[25%] mt-[20px] '>
        <h1 className='text-[35px] font-bold '>Liste des Produits</h1>
      </div>


      <SideBar/>
    </div>
  )
}
