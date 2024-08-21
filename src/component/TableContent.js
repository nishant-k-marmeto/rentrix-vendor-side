import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Flex, message } from 'antd';
import supabase from '../../supabase'; // Adjust the import based on your setup

const DataTableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  
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

  const handleAction = (record) => {
    message.info(`Details for ${record.laptop_model}`);
    // Implement the action logic here
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setData((prevData) => prevData.filter((item) => item.id !== id));
      message.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      message.error('Failed to delete item.');
    }
  };

  const columns = [
    {
      title: 'Laptop Model',
      dataIndex: 'laptop_model',
      key: 'laptop_model',
    },
    {
      title: 'Specifications',
      dataIndex: 'specification',
      key: 'specification',
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
          <a href="#" onClick={() => handleAction(record)}>Details</a>
          <a href="#" onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      console.log('Selected row keys changed:', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button type="primary" disabled={!hasSelected}>
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      {loading ? <p>Loading...</p> : error ? <p>Error loading data: {error.message}</p> : (
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} rowKey="id" />
      )}
    </Flex>
  );
};

export default DataTableComponent;
