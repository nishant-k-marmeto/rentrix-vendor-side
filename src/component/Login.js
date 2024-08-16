import React, {useState} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import LoginHeader from './LoginHeader';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext/AuthContext';
import supabase from '../../supabase';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const { user, error } = await supabase.auth.signInWithPassword( {
        email, password,
      });
     
      if (error) {
        console.error('Supabase error:', error.message);
        throw error;
      }
        navigate('/dashboard')
        login();
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <section>
      <LoginHeader heading='Log in' />
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 450,
          alignItems: 'center',
          padding: '3rem',
          margin: 'auto',
          flexDirection: 'column'
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
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
          <Input prefix={<UserOutlined />} placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" shape="round" htmlType="submit">
            Log in
          </Button>
          <span style={{ textAlign: 'center' }}>or</span>
          <Link to='/signup'>
          <Button block type="primary" shape="round">
            SignUp
          </Button>
          </Link>
        </Form.Item>
      </Form>
    </section>
  );
}
