import React, { useState, useEffect } from "react";
import { Menu, Avatar, Descriptions } from "antd";
import supabase from "../../supabase";
import { data } from "autoprefixer";


export default function UserProfileDetail(){
    const [current, setCurrent] = useState('user');
    const [userData, setUserData] = useState({});

    useEffect(() => {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from("vendor_data") // Replace with your table name
          .select("*");
  
        if (data) {
          console.log(data[0]);
          setUserData(data[0]);
        } else if (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);

    const { firstname, lastname, bussinessname, addressline1, addressline2, email, gst, phone, pin, residence, metadata } = userData;

    const items = [
      {
        label: (<Avatar style={{
          display:'flex',
          padding:'1rem',
          alignItems:'center',
          background:'black'
        }}>{ firstname }</Avatar>),
        key: 'user',
      },
  ]

    // data to be parsed
    const user_data = [
      {
        key: '1',
        label: 'First Name',
        children: firstname ,
      },
      {
        key: '2',
        label: 'Last Name',
        children: lastname,
      },
      {
        key: '3',
        label: 'Bussiness Name',
        children: bussinessname,
      },
      {
        key: '4',
        label: 'GST Number',
        children: gst,
      },
      {
        key: '5',
        label: 'Address Line 1',
        children: addressline1,
      },
      {
        key: '6',
        label: 'Address Line 2',
        children: addressline2,
      },
      {
        key: '7',
        label: 'State',
        children: residence,
      },
      {
        key: '8',
        label: 'E-mail',
        children: email,
      },
      {
        key: '9',
        label: 'Phone',
        children: phone,
      },
      {
        key: '10',
        label: 'Store Number',
        children: metadata?.store_num,
      },
    ]

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
      };

    return(
        <>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className="flex w-auto p-2 rounded-[40px] items-center justify-end bg-lime-200" />
        <Descriptions title="User Info" layout="vertical" items={user_data} className="p-2 mt-3 bg-lime-100 rounded-[20px] font-black font-xl font-normal" />
        </>
    )
}