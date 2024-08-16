import React, { useState, useEffect } from 'react';
import { Table, Space, message } from 'antd';
import supabase from '../../supabase'; // Adjust the import based on your setup

const DataTableComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get the logged-in user
                const { data: { user }, error: userError } = await supabase.auth.getUser();

                if (userError) {
                    throw userError;
                }

                const userId = user.id;

                // Fetch metadata from the 'vendor_data' table
                const { data: fetchedData, error: fetchError } = await supabase
                    .from('vendor_data')
                    .select('metadata')
                    .eq('user_id', userId)
                    .single();

                if (fetchError) {
                    throw fetchError;
                }

                // Assuming metadata is an array of laptop data
                setData(fetchedData.metadata || []);
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
                .from('vendor_data')
                .delete()
                .eq('user_id', id); // Adjust as per your deletion logic

            if (error) {
                throw error;
            }

            setData((prevData) => prevData.filter(item => item.id !== id));
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
            dataIndex: 'specification', // Ensure this matches your data field
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
                    <a href={`#`} onClick={() => handleAction(record)}>Details</a>
                    <a href={`#`} onClick={() => handleDelete(record.id)}>Delete</a>
                </Space>
            ),
        },
    ];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default DataTableComponent;
