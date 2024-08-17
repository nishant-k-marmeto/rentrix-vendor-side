import React from 'react';
import { Button, Result } from 'antd';

export default function Verfication() {
    return (
        <Result
            title="It Seems you have not been verfied yet!"
            extra={[
                <Button type="primary" key="console">
                    Home 
                </Button>,
                <Button key="buy">Verify</Button>,
            ]}
        />
    )
}

