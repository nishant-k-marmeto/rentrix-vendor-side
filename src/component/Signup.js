import React, { useState } from "react";
import LoginHeader from "./LoginHeader";
import supabase from '../../supabase';
import {Radio,
    Button,
    Cascader,
    Checkbox,
    Form,
    Input,
    Select,
    Modal,
} from "antd";
const { Option } = Select;
import state from "../component/utils/states.json";
import { Link, useNavigate } from "react-router-dom";

const residences = state;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 12,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 12,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export default function Signup() {

    const navigate = useNavigate();
    const [validateStatus, setValidateStatus] = useState("");
    const [form] = Form.useForm();

    const showSuccessModal = () => {
        Modal.success({
            title: "Registration Successful",
            content: "Thank you for Registration. please confirm the link sent in your e-mamil ",
            onOk() {
                navigate("/login"); // Navigate to login page on OK
            },
        });
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="91">+91</Option>
            </Select>
        </Form.Item>
    );

    const onFinish = async (values) => {
        console.log("values", values);
        try {
           // Sign up user with Supabase
            const { data, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    data: {
                        values
                    }
                }
            });

            if (error) {
                throw error;
            }
            showSuccessModal();
            navigate('/login');
            console.log("SignUp:", user);
        } catch (error) {
            console.error("SignUp:", error.message);
        }
    };


    return (
        <section >
            <LoginHeader heading="Register Account" />
            <Form
                className="w-full p-6 grid justify-center align-center"
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    residence: "Select State",
                    prefix: "91",
                }}
                scrollToFirstError

            >
                <Form.Item
                    name="regType"
                    label="Registration Type"
                >
                 <Checkbox value='vendor-form' checked disabled='disabled'>
                    Vendor
                </Checkbox>
                </Form.Item>
                
                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter First Name",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[
                        {
                            required: false,
                            message: "Please Enter Last Name",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    name="bussinessName"
                    label="Bussiness Name"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Last Name",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="gst"
                    label="GST Number"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please input your GST!",
                        },
                    ]}
                >
                    <Input
                        type="text"
                        showCount
                        maxLength={15}
                        allowClear
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail!",
                        },
                        {
                            required: true,
                            message: "Please input your E-mail!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("The two passwords that you entered do not match!")
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="addressLine1"
                    label="Address Line 1"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your address!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="addressLine2"
                    label="Address Line 2"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your address!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="residence"
                    label="State"
                    rules={[
                        {
                            required: true,
                            message: "Please select your state!",
                        },
                    ]}
                >
                    <Cascader options={residences} />
                </Form.Item>

                <Form.Item
                    name="pin"
                    label="Pin Code"
                    validateStatus={validateStatus}
                    hasFeedback
                    rules={[
                        {
                            required: false,
                            message: "Please input your pin code!",
                        },
                    ]}
                >
                    <Input
                        type="number"
                        showCount
                        maxLength={6}
                        allowClear
                        status={validateStatus}
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                >
                    <Input
                        showCount
                        maxLength={10}
                        addonBefore={prefixSelector}
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value
                                    ? Promise.resolve()
                                    : Promise.reject(new Error("Should accept agreement")),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <Link to="agreement">agreement</Link>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Signup
                    </Button>
                </Form.Item>
            </Form>
        </section>
    );
}
