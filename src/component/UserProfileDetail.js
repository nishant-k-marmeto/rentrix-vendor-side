import React, { useState, useEffect } from "react";
import { Menu, Descriptions, Avatar, Button, Steps } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { useAuth } from "../authContext/AuthContext";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase";

export default function UserProfileDetail() {
  const [current, setCurrent] = useState("user");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Logout error:", error.message);
      // Optionally, show an error message to the user
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the logged-in user's data
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          console.error("Error fetching user:", error);
          return;
        }

        // Extract user metadata if available
        const userMetadata = data?.user?.user_metadata?.values;
        console.log(userMetadata);

        if (userMetadata) {
          setUserData(userMetadata); // Set user metadata to state
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  // Destructure user data for display
  const {
    firstName,
    lastName,
    bussinessName,
    addressLine1,
    addressLine2,
    email,
    gst,
    phone,
    pin,
    residence,
    store_num,
  } = userData;

  const items = [
    {
      label: (
        <>
          <Steps
            style={{
              margin: "auto",
              width: "100%",
            }}
            size="small"
            current={1}
            items={[
              {
                title: "Registration",
              },
              {
                title: "Verification",
              },
              {
                title: "Onboarded",
              },
            ]}
          />
        </>
      ),
      key: "progress",
    },
    {
      label: <Avatar>{firstName?.charAt(0)}</Avatar>,
      key: "user",
    },
    {
      label: (
        <Button
          type="primary"
          shape="round"
          icon={<PoweroffOutlined />}
          onClick={handleLogout}
        />
      ),
      key: "logout",
    },
  ];

  // Data to be displayed in Descriptions
  const user_data = [
    {
      key: "1",
      label: "First Name",
      children: firstName || "N/A",
    },
    {
      key: "2",
      label: "Last Name",
      children: lastName || "N/A",
    },
    {
      key: "3",
      label: "Business Name",
      children: bussinessName || "N/A",
    },
    {
      key: "4",
      label: "GST Number",
      children: gst || "N/A",
    },
    {
      key: "5",
      label: "Address Line 1",
      children: addressLine1 || "N/A",
    },
    {
      key: "6",
      label: "Address Line 2",
      children: addressLine2 || "N/A",
    },
    {
      key: "7",
      label: "PIN Code",
      children: pin || "N/A",
    },
    {
      key: "8",
      label: "State",
      children: residence || "N/A",
    },
    {
      key: "9",
      label: "E-mail",
      children: email || "N/A",
    },
    {
      key: "10",
      label: "Phone",
      children: phone || "N/A",
    },
    {
      key: "11",
      label: "Store Number",
      children: store_num || "N/A",
    },
  ];

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="flex w-auto p-2 rounded-[40px] items-center justify-end bg-lime-200"
      />
      <Descriptions
        title="User Info"
        layout="vertical"
        column={1} // Adjust columns as needed
        className="p-2 mt-3 bg-lime-100 rounded-[20px] font-black font-xl font-normal"
      >
        {user_data.map((item) => (
          <Descriptions.Item label={item.label} key={item.key}>
            {item.children}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </>
  );
}
