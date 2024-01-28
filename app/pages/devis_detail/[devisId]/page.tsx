'use client'
import {Header, SiddeBar} from "@/components";
import React, {useEffect, useState} from "react";
import {Api} from "@/api/api";
import {
    HiDocumentChartBar,
    HiEnvelope,
    HiEnvelopeOpen,
    HiFunnel,
    HiOutlineEnvelope,
    HiUserCircle, HiUserPlus
} from "react-icons/hi2";
import {HiMap, HiPhone, HiSortAscending, HiUser} from "react-icons/hi";

export default function devis_detail({ params }: { params: { devisId: string }; }) {
    const [data, setData] = useState<any>([])
    const id = params.devisId;
    useEffect(() => {
        Api.get(`devise/single/${id}`).then((val) =>{
            setData(val)
        })
    }, []);
    return (
        <div className={'mb-20'}>
            <Header />
            <div className='ml-[25%] mt-[20px] '>
                <h1 className='text-[35px] font-bold '>Detail du devis</h1>
                <div className={'bg-cyan-700 p-5 w-[600px] flex flex-col space-y-10 ml-[5%]'}>
                    <div className={'flex flex-col space-y-6 bg-bgopacity p-5'}>
                        <div className={'flex space-x-5'}>
                            <HiUserCircle className={'w-[35px] h-[35px]'} />
                            <h1 className={'text-[25px]'}>Information de l'utilisation</h1>
                        </div>

                        <div className={''}>
                            <table>
                                <tbody>
                                <tr>
                                    <td> <HiUser className={'w-[30px] h-[30px]'}/> </td>
                                    <td>    Nom de l'utilisateur</td>
                                    <td>: {data.customer && data.customer.firstName ? data.customer.firstName : ''} </td>
                                </tr>

                                <tr>
                                    <td> <HiUser className={'w-[30px] h-[30px]'}/> </td>
                                    <td>    Prénom de l'utilisateur</td>
                                    <td>: {data.customer && data.customer.lastName ? data.customer.lastName : ''} </td>
                                </tr>

                                <tr>
                                    <td> <HiEnvelope className={'w-[30px] h-[30px]'}/> </td>
                                    <td>    Email de l'utilisateur</td>
                                    <td>: {data.customer && data.customer.email ? data.customer.email : ''} </td>
                                </tr>

                                <tr>
                                    <td> <HiFunnel className={'w-[30px] h-[30px]'}/> </td>
                                    <td>    type d'utilisateur</td>
                                    <td>: {data.customer && data.customer.type ? data.customer.type : ''} </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className={'bg-bgopacity flex flex-col space-y-6 p-5'}>
                        <div className={'flex space-x-5'}>
                            <HiDocumentChartBar className={'w-[40px] h-[40px]'} />
                            <h1 className={'text-[25px]'}>Detail du devis</h1>
                        </div>

                        <div className={''}>
                            <table>
                                <tbody>
                                <tr>
                                <td><HiUserPlus className={'w-[30px] h-[30px]'} /> </td>
                                    <td>   Nom et prénom</td>
                                    <td>: {data.name} {data.lastName}</td>
                                </tr>

                                <tr>
                                    <td><HiEnvelopeOpen className={'w-[30px] h-[30px]'} /> </td>
                                    <td>   Email</td>
                                    <td>: {data.email}</td>
                                </tr>

                                <tr>
                                    <td><HiPhone className={'w-[30px] h-[30px]'} /> </td>
                                    <td>   Tel</td>
                                    <td>: {data.phone}</td>
                                </tr>

                                <tr>
                                    <td><HiMap className={'w-[30px] h-[30px]'} /> </td>
                                    <td>   Addresse postal</td>
                                    <td>: {data.postal}</td>
                                </tr>

                                <tr>
                                    <td><HiMap className={'w-[30px] h-[30px]'} /> </td>
                                    <td>   Addresse</td>
                                    <td>: {data.address}</td>
                                </tr>

                                <tr>
                                    <td><HiSortAscending className={'w-[30px] h-[30px]'} /> </td>
                                    <td>   Société</td>
                                    <td>: {data.societe}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={'p-14]'}>
                            <h1 className={'text-center text-[20px]'}>Demande</h1>
                            <p className={'text-center text-[12px]'}>{data.demande}</p>
                        </div>
                    </div>

                </div>
            </div>
            <SiddeBar />
        </div>
    )
}