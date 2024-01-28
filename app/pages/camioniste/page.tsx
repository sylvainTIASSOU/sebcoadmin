'use client'
import { Header, SiddeBar } from '@/components';
import React, {useEffect, useState} from 'react'
import { FaBusAlt } from "react-icons/fa";
import {Api} from "@/api/api";
import Image from "next/image";


export default function camionisteListe() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    Api.get('truck/getAll').then((da: any) =>{
      setData(da);
    })
  }, []);
  return (
    
    <div>
<Header/>

<div className='ml-[25%] mt-[20px] '>
        <h1 className='text-[35px] font-bold '>Liste des camionistes disponible</h1>
      </div>

      <div className='ml-[47%] mt-[3%] flex flex-col space-y-5 '>
        {
          data.length == 0 ? <h1 className='text-center'>Pas de camionneur inscrit pour l'instant</h1> :
          data.map((cam: any, index) => {
            return <div key={index} className='flex flex-col space-y-2'>
              <div className='flex  space-x-2'>
                {/**icone */}
                <div>
                    {cam.photo != null ?
                        <Image src={cam.photo} alt={''} width={100} height={100} className='bg-cover'/> :
                        <FaBusAlt className='w-[100px] h-[100px] '/>}
                </div>

                {/*datas*/}
                <div className='flex flex-col  text-[12px] '>
                  <h1 className='text-[15px] '>{cam.lastName} {cam.firstName} </h1>

                  <div>
                    <table>

                        <tbody>
                        <tr>
                            <td>Localité</td>
                            <td>: {cam.localition} </td>
                        </tr>

                        <tr>
                            <td>Plaque</td>
                            <td>: {cam.plaque} </td>
                        </tr>

                        <tr>
                            <td>Dimension</td>
                            <td>: {cam.dimension} </td>
                        </tr>
                        </tbody>

                    </table>
                  </div>


                </div>
              </div>
              {/**button */}
              <div>
                <button type="button" className='w-[200px]'>
                  Détail
                </button>
               
              </div>

            </div>
          })
        }
      </div>

<SiddeBar/>
    </div>
  )
}
