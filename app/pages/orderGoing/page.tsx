"use client"
import { Header, SiddeBar } from '@/components'
import Link from 'next/link';
import React, {useEffect, useState} from 'react'
import { HiShoppingCart}from "react-icons/hi2";
import {Api} from "@/api/api";


export default function orderGoing() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    Api.get('delivery/getAllByStatus/going').then((dt) => {
      setData(dt);
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
              data.length == 0 ? <h1>Pas de livraaison effectueé</h1> :
                  data.map((commandes) => {
                    return <Link href={`/pages/orderDetail/${commandes.id}`}>
                      <div className='flex space-x-5 border-2 border-white rounded-lg px-3 w-[300px] '>
                        {/**icone */}
                        <div className='pt-[20px] '>
                          < HiShoppingCart className='w-[35px] h-[35px] ' />
                        </div>

                        {/**data */}
                        <div className='flex flex-col'>
                          {
                              commandes.customer && commandes.customer.lastName ? commandes.customer.lastName : ''
                          }

                          <table>
                              <tbody>
                              <tr className='text-[12px] '>
                                  <td>date de la commande</td>
                                  <td> {commandes.orderDate} </td>
                              </tr>

                              <tr className='text-[12px] '>
                                  <td>date de livraison</td>
                                  <td> {commandes.deliveryDate} </td>
                              </tr>

                              <tr className='text-[12px] '>
                                  <td>heure de livraison</td>
                                  <td> {commandes.deliveryHours} </td>
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
