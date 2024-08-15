import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, message } from 'antd';
import supabase from '../../supabase';

const columns = [
  {
    title: 'Laptop Model',
    dataIndex: 'laptop_model',
    key: 'laptop_model',
  },
  {
    title: 'Specifications',
    dataIndex: 'specifications',
    key: 'specifications',
  },
  {
    title: 'Monthly Rate',
    dataIndex: 'monthly_rate',
    key: 'monthly_rate',
    render: (text) => `$${text}`,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a href={`#`} onClick={() => handleAction(record)}>Details</a>
        <a href={`#`} onClick={() => handleDelete(record.id)}>Delete</a>
      </Space>
    ),
  },
];

const handleAction = (record) => {
  // Handle action like showing details or any other functionality
  console.log('Action on:', record);
};

const handleDelete = async (id) => {
  try {
    const { error } = await supabase
      .from('vendor_data')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
    message.success('Record deleted successfully');
    // Fetch data again after deletion
    fetchData();
  } catch (error) {
    console.error('Error deleting record:', error);
    message.error('Failed to delete record.');
  }
};

const TableContent = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data: vendorData, error } = await supabase
        .from('vendor_data')
        .select('*');
        console.log(vendorData);
      if (error) {
        throw error;
      }
      setData(vendorData);
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Failed to fetch data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default TableContent;
