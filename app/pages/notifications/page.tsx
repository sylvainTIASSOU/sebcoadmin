'use client'
import { SiddeBar, Header } from '@/components'
import React, {useEffect, useState} from 'react'
import {Api} from "@/api/api";
import {HiBell} from "react-icons/hi";
import {HiMiniTrash} from "react-icons/hi2";
import {io} from "socket.io-client"
import {useRouter} from "next/navigation";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const notify = () => toast.info(" Nouveau notification de commande", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    icon: ({theme, type}) => <HiBell  />
});
export default function notification() {
    const route = useRouter();
    const [notif, setNotif] = useState<any[]>([])

    const socket = io('http://localhost:3001');
    useEffect(() => {
        Api.get('notification/all').then((val) =>{
            setNotif(val)
            console.log(val);
        })
    }, []);
    socket.on('connect', () => {

        console.log('la connexion est etablie')
    })

    socket.on('message', (message) => {
        notify()
        console.log(`message recu: ${message}`);
    })

    socket.on('disconnect', () => {
        console.log('la connexion est deconnecté');
    })
  return (
    <div>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"

        />
      <Header/>
        <div className='ml-[25%] mt-[20px] '>
            <h1 className='text-[35px] font-bold '>Notifications</h1>

            <div className={' flex flex-col space-y-5 bg-bgopacity w-[600px] rounded-xl mt-5 mb-20 p-5 content-center justify-center'}>
                {
                    notif.length == 0 ? <div>
                        No Notification
                    </div> :
                        notif.map((data, index) => {
                            return   <div key={index} className={'flex space-x-5 px-5 py-2 bg-blue-700 rounded-md w-[350px] self-center'}>
                                <HiBell className={'w-[50px] h-[50px]'} />

                                <div className={'flex flex-col space-y-1'}>
                                    <h1>{data.content}</h1>

                                    <h1 className={'text-[12px]'}>{data.CreateAt}</h1>
                                </div>

                                <HiMiniTrash className={' mt-[20px] w-[20px] h-[20px]'} />
                            </div>
                        })

                }

            </div>
      </div>
      <SiddeBar/>

    </div>
  )
}
