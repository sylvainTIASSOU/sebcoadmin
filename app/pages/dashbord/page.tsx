'use client'
import { SiddeBar, Header } from '@/components'
import Link from 'next/link';
import React, {useEffect} from 'react'
import { BiSolidTaxi } from "react-icons/bi";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { FaBiking } from "react-icons/fa";
import {
  HiPlusCircle,
  HiMiniTruck,
  HiMiniClipboardDocumentList,
  HiMiniBell


}
  from "react-icons/hi2";
import {Api} from "@/api/api";

export default function dashbord() {
  let [isOpen, setIsOpen] = useState(false)
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
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  return (
    <div>
      <Header />
      <div className='ml-[25%] mt-[20px] '>
        <h1 className='text-[35px] font-bold '>Tableau de bord</h1>
      </div>
      <div className='ml-[25%] flex space-x-[50px] '>


        <div className='flex flex-col  w-[500px] bg-bgopacity rounded-[30px] p-5 mt-5'>
          {/**card 1 et 2 */}
          <div className='flex space-x-[300px] '>

            <button type="button"
            onClick={openModal}>
                <div className='flex flex-col w-[80px] '>
                <HiPlusCircle className='w-[60px] h-[60px] text-btnbg pr-[3px] ml-[12%]  ' />
                <h1 className='text-[15px] font-bold text-center '>Ajouter un produit</h1>
              </div>
            </button>
            

            <Link href='/pages/orderGoing'>
              <div className='flex flex-col w-[80px] '>
                <FaBiking className='w-[60px] h-[60px] text-btnbg pr-[3px] ml-[12%] ' />
                <h1 className='text-[15px] font-bold text-center '>Les livraisons en cours</h1>
              </div>
            </Link>

          </div>
          {/**card 3 */}
          <Link href='/pages/orderDone' className='ml-[40%] '>
            <div className='flex flex-col w-[80px] '>
              <BiSolidTaxi className='w-[60px] h-[60px] text-btnbg pr-[3px] ml-[12%]  ' />
              <h1 className='text-[15px] font-bold text-center '>Les livraisons effectueés</h1>
            </div>
          </Link>

          {/**card 4 et 5 */}
          <div className='flex space-x-[300px] '>

            <Link href='/pages/productList'>
              <div className='flex flex-col w-[80px] '>
                <HiMiniClipboardDocumentList className='w-[60px] ml-[12%] h-[60px] text-btnbg pr-[3px] ' />
                <h1 className='text-[15px] font-bold text-center '>Liste des produits</h1>
              </div>
            </Link>

            <Link href='/pages/camioniste'>
              <div className='flex flex-col w-[80px] '>
                <HiMiniTruck className='w-[60px] h-[60px] ml-[12%] text-btnbg pr-[3px] ' />
                <h1 className='text-[15px] font-bold text-center '>Liste des camionistes</h1>
              </div>
            </Link>

          </div>

        </div>
        {/**Notification */}

        <div>
          <h1>Notifications des commandes</h1>

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


      </div>
      <SiddeBar />


      {/** dialogue */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <div>
<Link href='/pages/productAdd'
                  className='text-btnbg text-[25] m-3 text-center'>
                    Ajouter du Sable, Gravier et Ramblais
                    </Link>
                    </div>
                  

                    <div>
                      <Link href='/pages/addMaterial'
                   className='text-btnbg text-[25] m-3 text-center'>
                    Ajouter des matériaux de construction
                  </Link>
                    </div>
                  
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Fermer
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </div>
  )
}
