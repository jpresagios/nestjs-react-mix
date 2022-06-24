import {
  Space, Table, Button, Tooltip, Badge,
} from 'antd';
import { CheckCircleTwoTone, CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import { DeviceI } from '../../../interfaces/gateway';
import './list-row.less';

interface DeviceListI {
  deviceList: DeviceI[];
}

export default function DeviceList({ deviceList }:DeviceListI) {
  const columns: ColumnsType<DeviceI> = [
    {
      title: 'Uid',
      dataIndex: 'uid',
      key: 'uid',
      render: (_, { uid }) => uid,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => (<Badge status={status === 'online' ? 'success' : 'error'} text={status} />),
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, { _id }) => (
        <Space size="middle">
          <Tooltip title="Detail">
            <Button type="primary" shape="circle" icon={<DeleteOutlined />} danger />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table rowKey="_id" rowClassName="gateway-list" columns={columns} dataSource={deviceList} />
  );
}
