'use client'
import { Header, SiddeBar } from '@/components'

import { HiMiniUserCircle } from "react-icons/hi2";
import React,{ useState, useEffect } from 'react';
import {Api} from "@/api/api";



export default function adminListe() {
  const [data,setData] = useState<any[]>([]);



  useEffect( () => {

    Api.get('users/getAdmin').then((responseData) => {

      setData(responseData);
    })

  }, [])

  
  return (
    <div>
      <Header />

      <div className='ml-[25%] mt-[20px] '>
        <h1 className='text-[35px] font-bold '>Liste des administrateurs</h1>
      </div>

      <div>
        <div className='flex flex-col space-y-[10px] ml-[40%] '>
          

          {
            
            data.map((admins: any, index) => {
              return <div key={index} className='bg-bgopacity flex flex-col py-3 pl-[45px] w-[350px] rounded-lg '>

                <div className='flex space-x-10'>
                  {/**logo */}
                  <div className='mt-[10px] '>
                    <HiMiniUserCircle className='w-[30px] h-[30px] ' />
                  </div>
                  {/**data*/}
                  <div className='flex flex-col'>
                    
                     
                      <h1>{admins.pseudo}</h1>
                   
                    <h1> {admins.phone} </h1>
                  </div>

                  <div className='mt-[10px] '>
                    <h1> {admins.role} </h1>
                  </div>

                </div>

                <div>
                  {/**button*/}
                  <div className='self-center'>

                    <button type="button" className='bg-btnbg px-2 text-[15px] font-bold rounded-[10px]'>
                      BLOQUER
                    </button>

                  </div>
                </div>

              </div>
            })
          }


        </div>
      </div>



      <SiddeBar />
    </div>
  )
}
