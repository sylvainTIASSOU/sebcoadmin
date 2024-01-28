'use client'
import { CustomButton, Header, SiddeBar } from '@/components';
import { useRouter } from 'next/navigation';
import React, {useEffect, useState} from 'react'
import { FaBusAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import {Api} from "@/api/api";
import Image from "next/image";
import {DriverModel} from "@/models/driverModel";

const notifySucces = () => toast("Commande passée avec succès");


const page = ({ params }: { params: { orderId: string }; }) => {
  const [data, setData] = useState<any[]>([]);
  const route = useRouter();
  const orderid = Number(params.orderId);

  useEffect(() => {
    Api.get('truck/getAllByStatus/free').then((d) => {
      setData(d);
    });
  }, []);
  return (
    <div className='mb-[50px] '>
      <Header />

      <div className='ml-[25%] mt-[20px] '>
        <h1 className='text-[35px] font-bold '>Liste des camionistes disponible</h1>
      </div>

      <div className='ml-[47%] mt-[3%] flex flex-col space-y-5 '>
        {
          data.length == 0 ? <h1> Les camionniste ne sont pas  disponible</h1> :
          data.map((cam) => {
            return <div className='flex flex-col space-y-2'>
              <div className='flex  space-x-2'>
                {/**icone */}
                <div>
                  {cam.photo != null ?
                      <Image src={cam.photo} alt={''} width={100} height={100} className='bg-cover'/>   :
                      <FaBusAlt className='w-[100px] h-[100px] '/>}
                </div>

                {/*datas*/}
                <div className='flex flex-col  text-[12px] '>
                  <h1 className='text-[15px] '>{cam.fistName} {cam.lastName} </h1>

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
                <button type="button" 
                onClick={() => {
                  Api.get(`driver/single/${cam.id}`).then((dt: any) => {
                    const driverModel = new DriverModel(dt.lastName, dt.firstName, dt.location, dt.phone, dt.image, 'busy');
                  })

                   Api.post(
                      {
                    status: 'passer',
                    driver_id: Number(cam.id),
                    order_id: orderid,
                      }, 'delivery/add').then((resp) => {
                        if(resp.ok) {
                          notifySucces()
                          route.push('/pages/dashbord')
                        }
                   });
                }}
                className='w-[200px] border-2 rounded-sm text-btnbg'>
                  Associer
                </button>

                
              </div>

            </div>
          })
        }
      </div>
      <ToastContainer/>
      <SiddeBar />
    </div>
  )
}

export default page