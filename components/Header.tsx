'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import {
  HiShoppingCart,
  HiMiniBell,
  HiMiniChatBubbleOvalLeftEllipsis,
  HiMiniCurrencyDollar,
  HiMiniUserCircle

}
  from "react-icons/hi2";
import { Tooltip as ReactTooltip } from 'react-tooltip'

const links = [
  {
    href: '/pages/orders',
    icon: <HiShoppingCart className='w-[35px] h-[35px]' data-tooltip-id="Commandes" />,
    name: 'Commandes',
  },
  {
    href: '/pages/notifications',
    icon: <HiMiniBell className='w-[35px] h-[35px] ' data-tooltip-id="Notifications" />,
    name: 'Notifications',
  },
  {
    href: '/pages/transactions',
    icon: <HiMiniCurrencyDollar className='w-[35px] h-[35px] ' data-tooltip-id="Transactions" />,
    name: 'Transactions',
  },
  {
    href: '/pages/messages',
    icon: <HiMiniChatBubbleOvalLeftEllipsis className='w-[35px] h-[35px] ' data-tooltip-id="Messages" />,
    name: 'Messages',
  },

];
const Header = () => {
  const pathName = usePathname();
  return (

    <div>

      {/**compte */}
      <div className='absolute right-[30px] top-[10px] '>
        <Link href={'#'} className='flex space-x-3'>
          <HiMiniUserCircle className='w-[30px] h-[30px] ' />
          <h1>compte</h1>
        </Link>
      </div>

      {/**les icones de droite */}
      <div className='fixed right-5 top-[25%] '>
        <div className='flex flex-col space-y-10  bg-bgopacity rounded-[30px] p-3 '>
          {
            links.map((link, index) => {
              return <Link href={link.href} key={index}
                className={`${link.href === pathName && 'text-btnbg'}  hover:text-accent`}>
                {link.icon}


                <ReactTooltip
                  id={link.name}
                  place="left"
                  content={link.name}
                />
              </Link>

            })
          }
        </div>
      </div>
    </div>


  )
}

export default Header