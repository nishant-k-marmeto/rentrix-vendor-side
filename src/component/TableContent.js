import React, { useState, useEffect } from 'react';
import { Table, Space, Button, message } from 'antd';
import supabase from '../../supabase'; // Adjust the import path based on your setup

const DataTableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the logged-in user
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        const userId = user.id;

        // Fetch device_data from the 'profiles' table
        const { data: fetchedData, error: fetchError } = await supabase
          .from('profiles')
          .select('device_data')
          .eq('id', userId)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        // Log fetched data for debugging
        console.log('Fetched device data:', fetchedData);

        // Assuming device_data is a JSON object and you want to display its properties
        const deviceDataArray = fetchedData.device_data || [];

        setData(deviceDataArray);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        message.error('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle deletion of an item
  const handleDelete = async (id) => {
    try {
      // Get the logged-in user ID again
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        throw userError;
      }
      const userId = user.id;

      // Fetch the current device_data
      const { data: fetchedData, error: fetchError } = await supabase
        .from('profiles')
        .select('device_data')
        .eq('id', userId)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      // Remove the item with the specified id from device_data
      const updatedDeviceData = fetchedData.device_data.filter(item => item.id !== id);

      // Update the device_data in the profiles table
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ device_data: updatedDeviceData })
        .eq('id', userId);

      if (updateError) {
        throw updateError;
      }

      // Update the component state to reflect the change
      setData(updatedDeviceData);
      message.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      message.error('Failed to delete item.');
    }
  };

  // Define the columns for the table
  const columns = [
    {
      title: 'Laptop Model',
      dataIndex: 'laptop_model',
      key: 'laptop_model',
    },
    {
      title: 'Specification',
      dataIndex: 'specifications',
      key: 'specifications',
    },
    {
      title: 'Monthly Rate',
      dataIndex: 'rent_price_pm',
      key: 'rent_price_pm',
      render: (text) => `₹${text}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  // Row selection configuration
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div style={{ padding: 24 }}>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" disabled={!hasSelected}>
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Space>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading data: {error.message}</p>
      ) : (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default DataTableComponent;
