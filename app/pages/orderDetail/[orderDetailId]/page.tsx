'use client'
import { CustomButton, Header, SiddeBar } from '@/components';
import Image from 'next/image';
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import {Api} from "@/api/api";


const page = ({ params }: { params: { orderDetailId: string }; }) => {
  const [order, setOrder] = useState<any>([])
  const [orderItem, setOrderItem] = useState<any[]>([])

  const orderid = Number(params.orderDetailId);
  useEffect(() => {
    Api.get(`order-item/getByOrder/${orderid}`).then((val) => {
      console.log(val)
      setOrderItem(val)
    });

    Api.get(`order/single/${orderid}`).then((val) => {
      console.log(val)
      setOrder(val)
    });
  }, []);

  const route = useRouter();
  return (
    <div className='mb-[30px] '>
      <Header />
      <div className='ml-[25%] mt-[20px] '>
        <h1 className='text-[35px] font-bold '>Detail du commande</h1>
      </div>

      <div className='grid grid-cols-2 gap-6 h-[450px] w-[600px] bg-bgopacity rounded-lg p-5 ml-[30%] mt-[2%] '>

        {
          orderItem.map((ordersItems, index) => {
                return <div key={index} className='w-auto h-[40px] ml-[50px] '>
                  <div className='flex flex-col space-y-2'>
                    {/**image */}
                    <div>
                      <Image
                        src={ordersItems.photo}
                        alt=''
                        width={150}
                        height={150}
                        className='bg-cover'
                      />
                    </div>

                    <div>
                      <table>
                        <tbody>
                        <tr>
                          <td>quantité : </td>
                          <td> {ordersItems.quantite} </td>
                        </tr>
                        <tr>
                          <td>montant : </td>
                          <td> {ordersItems.montant} </td>
                        </tr>
                        </tbody>

                      </table>
                    </div>

                  </div>
                </div>



          })
        }

      </div>

      {/**detail  */}
      <div className='w-[600px] bg-bgopacity rounded-lg p-2 ml-[30%] mt-5  flex space-x-[10px] '>
        {/**table1 */}
        <div>
          <table>
            <tbody>
            <tr>
              <td>Nom de l'indique</td>
              <td>: {order.indiqueName}</td>
            </tr>

            <tr>
              <td>Numéro de l'indique</td>
              <td>: {order.indiqueNumber}</td>
            </tr>

            <tr>
              <td>Date de livraison</td>
              <td>: {order.deliveryDate}</td>
            </tr>

            </tbody>

          </table>

        </div>

        {/**table2 */}
        <div>
          <table>
            <tbody>
            <tr>
              <td>Ville</td>
              <td>: {order.city}</td>
            </tr>

            <tr>
              <td>Quartier</td>
              <td>: {order.quarter}</td>
            </tr>

            <tr>
              <td>Somme total</td>
              <td>: {order.price}</td>
            </tr>

            </tbody>

          </table>

        </div>

      </div>

      {/**button */}
      <div className='w-[600px] bg-bgopacity rounded-lg p-5 ml-[30%] mt-5  flex content-between justify-between '>


        <div className=''>
          <button type="button" className='bg-btnbg p-2 text-[20px] font-bold rounded-[10px]'>
            Annuler la commande
          </button>

        </div>

        <div className=' '>
          <button type="button"
            onClick={() => {
              route.push(`/pages/camioniste_dispo/${orderid}`);
            }}
            className='bg-btnbg p-2 text-[20px] font-bold rounded-[10px]'>
            Passer la commande
          </button>
        </div>
      </div>

      <SiddeBar />
    </div>
  )
}

export default page