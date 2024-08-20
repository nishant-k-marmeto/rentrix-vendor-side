import React, { useState, useEffect } from "react";
import { Menu, Descriptions, Avatar, Button, Steps } from "antd";
import { PoweroffOutlined } from '@ant-design/icons';
import { useAuth } from "../authContext/AuthContext";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase";
import { data } from "autoprefixer";


export default function UserProfileDetail(){
  
    const [current, setCurrent] = useState('user');
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const { logout } = useAuth();
    const handleLogout = async () => {
      try {
        await logout();
        navigate('/login'); // Redirect to login page after successful logout
      } catch (error) {
        console.error('Logout error:', error.message);
        // Optionally, show an error message to the user
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        const {data, error } = await supabase.auth.getUser();
        console.log(data?.user?.user_metadata?.values);
        const { userData } = data?.user?.user_metadata?.values

        if (error) {
            console.error('Error fetching user:', error);
            return;
        }
    
        if (userData) {
          setUserData(userData);
        } else if (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);

    const { firstname, lastname, bussinessname, addressline1, addressline2, email, gst, phone, pin, residence, metadata } = userData;
   
    const items = [
      {
        label: ( <><Steps
          style={{
            margin:'auto',
            width:'100%'
          }}
          size="small"
          current={1}
          items={[
            {
              title: 'Registration',
            },
            {
              title: 'Verification',
            },
            {
              title: 'Onboarded',
            },
          ]}
        />
        </>
      ),
        key: 'progress',
      },
      {
        label: (<Avatar> { firstname } </Avatar> ),
        key: 'user',
      },
      {
        label: (  <Button
          type="primary"
          shape="round"
          icon={<PoweroffOutlined />}
          onClick={handleLogout}
        >
        </Button> ),
        key: 'logout',
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
        label: 'PIN Code',
        children: pin,
      },
      {
        key: '8',
        label: 'State',
        children: residence,
      },
      {
        key: '9',
        label: 'E-mail',
        children: email,
      },
      {
        key: '10',
        label: 'Phone',
        children: phone,
      },
      {
        key: '11',
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