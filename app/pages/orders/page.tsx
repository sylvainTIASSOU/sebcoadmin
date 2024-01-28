"use client"
import { Header, SiddeBar } from '@/components'
import Link from 'next/link';
import React, {useEffect, useState} from 'react'
import {HiMiniBell, HiShoppingCart} from "react-icons/hi2";
import {Api} from "@/api/api";


export default function order() {
    const [order, setOrder] = useState<any[]>([])
    const [notif, setNotif] = useState<any[]>([])
    //const [customer, setCustomer] = useState<any>()

    useEffect(() => {
        Api.get('notification/all').then((val) => {
            setNotif(val)
        })

        Api.get('order/getOrderByStatus/pass').then((val) => {
            setOrder(val)
        })
    }, []);
  return (
      <div>
        <Header />
        <div className='ml-[25%] mt-[20px] '>
          <h1 className='text-[35px] font-bold '>Liste des commandes effectué</h1>
        </div>



        <div className=' ml-[40%] mt-[3%] '>
            <div className='flex flex-col space-y-[10px] '>
                {
                    order.length == 0 ? <div className={''}>
                            <img src={'/svg/Warning-rafiki.svg'} className={'bg-cover bg-center '} />
                        </div> :
                        order.map((commandes) => {
                            return <Link href={`/pages/orderDetail/${commandes.id}`}>
                                <div className='flex space-x-5 border-2 border-white rounded-lg px-3 w-[300px] '>
                                    {/**icone */}
                                    <div className='pt-[20px] '>
                                        <HiMiniBell className='w-[35px] h-[35px] ' />
                                    </div>

                                    {/**data */}
                                    <div className='flex flex-col'>
                                        <h1 className='text-[15px] text-center'> {commandes.customer.firstName} {commandes.customer.lastName} </h1>
                                        <table>
                                            <tbody>
                                            <tr className='text-[12px] '>
                                                <td>date de la commande</td>
                                                <td>: {commandes.createAt} </td>
                                            </tr>

                                            <tr className='text-[12px] '>
                                                <td>date de livraison</td>
                                                <td>: {commandes.deliveryDate} </td>
                                            </tr>

                                            </tbody>


                                        </table>
                                    </div>

                                </div>
                            </Link>
                        })
                }

            </div>
        </div>


        <SiddeBar/>
      </div>
  )
}
