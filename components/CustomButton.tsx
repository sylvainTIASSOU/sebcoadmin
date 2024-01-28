'use client'
import { ButtonProps } from '@/types'
import React from 'react'

const CustomButton = ({title, type, style}:ButtonProps) => {
  return (
    <button
    type={type}
    className= {`bg-btnbg p-2 text-[20px] font-bold rounded-[10px] ${style}`}
    >
      {title}
    </button>
  )
}

export default CustomButton