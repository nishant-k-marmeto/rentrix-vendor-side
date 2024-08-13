import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import Papa from 'papaparse';
import supabase from '../../supabase'

const { Dragger } = Upload;

const UploadComponent = () => {
    const uploadData = async (data) => {
        try {
            const { error } = await supabase
                .from('vendor_data') // Use the updated table name
                .insert([{ data }])

            if (error) {
                throw error;
            } else {
                message.success('Data uploaded successfully!');
            }
        } catch (error) {
            console.error('Error inserting data:', error);
            message.error('Failed to upload data.');
        }
    };

    const customRequest = async ({ file, onSuccess, onError }) => {
        try {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: async (results) => {
                    console.log(results.data); // Log data for debugging
                    await uploadData(results.data);
                    console.log(uploadData)
                    onSuccess(); // Call onSuccess when upload is complete
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                    onError(error); // Call onError in case of a parsing error
                }
            });
        } catch (error) {
            console.error('Error handling file:', error);
            onError(error); // Call onError in case of a file handling error
        }
    };

    const props = {
        name: 'file',
        multiple: false, // Allow only one file at a time
        accept: '.csv', // Accept only CSV files
        showUploadList: false, // Hide the default upload list
        customRequest, // Use the custom request handler
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <>
            <span className='text-xl text-fine text-center'>Please upload a file in .csv format only</span>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>
        </>
    );
};

export default UploadComponent;
