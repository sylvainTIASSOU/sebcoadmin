'use client'
import { CustomButton, Header, SiddeBar } from '@/components'
import React, {useEffect, useState} from 'react'
import { HiMiniUserCircle }from "react-icons/hi2";
import {Api} from "@/api/api";
import {useRouter} from "next/navigation";


export default function customerList() {
    const [customer, setCustomer] = useState<any[]>([]);
    const route = useRouter();

    useEffect(() => {
        Api.get('customer/all').then((val) =>{
            setCustomer(val);
            //console.log(val)
        })
    }, []);
  return (
    <div>
      <Header/>

      <div className=' mt-[20px] '>
        <h1 className='text-[35px] font-bold text-center '>Liste des clients</h1>
      </div>

      <div>
        <div className='flex flex-col space-y-[10px] flex items-center justify-center '>

          {
              customer.length == 0 ? <div>
                  <h1 className={'text-center'}>no customer </h1>
                  </div> :
            customer.map((custom, index) => {
              return <div key={index} className='bg-bgopacity flex flex-col py-3 pl-[45px] w-[350px] rounded-lg '>
                
                <div className='flex space-x-10'>
                  {/**logo */}
                  <div className='mt-[10px] '>
                    <HiMiniUserCircle className='w-[30px] h-[30px] '/>
                  </div>
                  {/**data*/}
                  <div className='flex flex-col'>
                    <h1> {custom.lastName} </h1>
                    <h1> {custom.firstName} </h1>
                  </div>

                  <div className='mt-[10px] '>
                  <h1> {custom.email} </h1>
                  </div>

                </div>

                <div>
{/**button*/}
                  <div className='flex space-x-[50px]  '>
                      <button
                          className={'p-2 w-full bg-btnbg'}
                      type={'button'}
                      onClick={() =>{
                          null;
                      }}
                      >
                          EDITER
                      </button>


                  </div>
                </div>

              </div>
            })
          }


        </div>
      </div>



      <SiddeBar/>
    </div>
  )
}
