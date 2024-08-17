import React from 'react'
import { Footer } from 'antd/es/layout/layout'

export default function FooterMain() {
  return (
    <Footer className='text-center text-white text-thin text-xl bg-[#001529]'>
      Rentrix #tech on Tap ©{new Date().getFullYear()} Created by Rentrix Designs
    </Footer>
  )
}
