import {
  Space, Table, Button, Tooltip,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import { GatewayI } from '../../../interfaces/gateway';
import './gateway-list.less';

interface GatewayListI {
  gatewayList: GatewayI[];
}

export default function GatewayList({ gatewayList }: GatewayListI) {
  const columns: ColumnsType<GatewayI> = [
    {
      title: 'Serial Number',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      render: (_, { serialNumber }) => <a>{serialNumber}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, { name }) => <a>{name}</a>,
    },
    {
      title: 'IpV4',
      dataIndex: 'ipV4',
      key: 'ipV4',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Detail">
            <Button type="primary" shape="circle" icon={<EyeOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table rowClassName="gateway-list" columns={columns} dataSource={gatewayList} />
  );
}
