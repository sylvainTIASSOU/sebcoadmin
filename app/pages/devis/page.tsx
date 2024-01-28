'use client'
import {Header, SiddeBar} from "@/components";
import React, {useEffect, useState} from "react";
import {Api} from "@/api/api";
import {HiNewspaper} from "react-icons/hi";
import Link from "next/link";

export  default function devis() {
    const [data, setData] = useState<any[]>([])
    useEffect(() => {
        Api.get('devise/all').then((val) =>{
            setData(val)
        })

    }, []);
    return (
     <div className={''}>
         <Header />
         <div className='ml-[25%] mt-[20px] '>
             <h1 className='text-[35px] font-bold '>Liste des devis</h1>
             <div className={'ml-[10%] mt-[3%] '}>
                 <div className={'flex flex-col w-[600px] content-center items-center p-3 space-y-6 bg-cyan-700'}>
                     {
                         data.length == 0 ? <div>
                             liste des devis vide
                         </div> :
                             data.map((val, index) =>{
                                 return <Link key={index} href={`/pages/devis_detail/${val.id}`}><div className={' flex space-x-7 w-[350px] bg-bgopacity border-emerald-300 border-2 p-2 raduice-[5px]'}>
                                     <div>
                                         <HiNewspaper className={'w-[50px] h-[50px] mt-[20px]'}/>
                                     </div>

                                     <div className={'flex flex-col space-y-1'}>
                                         <h1>{val.lastName} {val.firstName}</h1>
                                         <h1> {val.email} </h1>
                                         <h1 className={'text-[12px]'}>{val.createAt} </h1>
                                     </div>
                                 </div>
                                 </Link>
                             })

                     }

                 </div>

             </div>
         </div>

         <SiddeBar />
     </div>
    )
}