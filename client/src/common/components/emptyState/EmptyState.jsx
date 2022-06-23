import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export default function EmptyState() {
  return (
    <div className="body-campaign">
      <Title className="title-campaign" level={4}>
        No data found here.
      </Title>
    </div>
  );
}
