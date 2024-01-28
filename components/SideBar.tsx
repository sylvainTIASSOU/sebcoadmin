'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import { usePathname } from 'next/navigation';
import {
  HiCircleStack,
  HiUserPlus,
  HiNewspaper,
  HiMiniClipboard,
  HiComputerDesktop,
  HiMiniNewspaper,

}
  from "react-icons/hi2";
import {userContextProvider} from "@/context/Context";
import {Api} from "@/api/api";

const links = [
  {
    href: '/pages/dashbord',
    icon: <HiComputerDesktop className='w-[35px] h-[35px] ' />,
    name: 'Tableau de bord',
  },
  {
    href: '/pages/statistique',
    icon: <HiCircleStack className='w-[35px] h-[35px] ' />,
    name: 'Statistiques',
  },
  {
    href: '/pages/addAdmin',
    icon: <HiUserPlus className='w-[35px] h-[35px] ' />,
    name: 'Add admin',
  },
  {
    href: '/pages/adminListe',
    icon: <HiMiniNewspaper className='w-[35px] h-[35px] ' />,
    name: 'Liste des admins',
  },
  {
    href: '/pages/customerListe',
    icon: <HiMiniClipboard className='w-[35px] h-[35px] ' />,
    name: 'Liste des clients',
  },

  {
    href: '/pages/devis',
    icon: <HiNewspaper className='w-[35px] h-[35px] ' />,
    name: 'Liste des Devis',
  },

];

const SideBar = () => {
  const [data, setData] = useState<any>();
  // @ts-ignore
  const { user } = userContextProvider();
  const pathName = usePathname();

  useEffect(() => {
    if(user != null) {
      Api.get(`users/single/${user!.toString()}`).then((e) => {
        setData(e);
      })
    }

  }, []);
  return (
    <div className='bg-bgopacity w-[280px] h-screen fixed left-0 top-0'>
      <div className='flex flex-col space-y-2 p-2'>

        {/**logo */}
        <div className='ml-[50px] '>
          <Image
            alt=''
            src={'/logofav.png'}
            width={120}
            height={120}
          />
        </div>
        {/**links */}

        {
          links.map((link, index) => {
            return <div className='rounded-[30px] p-2  bg-bgopacity w-auto max-h-auto hover:bg-white'>
              <Link
                href={link.href}
                key={index}
                className={`${link.href === pathName && 'text-btnbg'}  hover:text-accent`}
              >
                <div className='flex space-x-5'>
                  <div>
                    {link.icon}
                  </div>
                  <div className='text-[20px]'>
                    {link.name}
                  </div>

                </div>
              </Link>
            </div>
          })
        }
{/** l'admin connecté*/}
        <div className='rounded-[30px] p-2 mt-[30px] mx-5 bg-bgopacity w-auto max-h-auto'>
          <h1 className='text-center text-green-700'>{data?.role}</h1>
          <h1 className='text-center'>{data?.pseudo}</h1>
        </div>
      </div>

    </div>
  )
}

export default SideBar