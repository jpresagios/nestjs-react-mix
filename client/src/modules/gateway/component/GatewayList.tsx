import {
  Space, Table, Button, Tooltip,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import { useNavigate } from 'react-router-dom';
import { GatewayI } from '../../../interfaces/gateway';
import './list-row.less';

interface GatewayListI {
  gatewayList: GatewayI[];
}

export default function GatewayList({ gatewayList }: GatewayListI) {
  const navigate = useNavigate();

  const columns: ColumnsType<GatewayI> = [
    {
      title: 'Serial Number',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      render: (_, { _id }) => (
        <Space size="middle">
          <Tooltip title="Detail">
            <Button type="primary" shape="circle" icon={<EyeOutlined />} onClick={() => navigate(`/gateway/${_id}`)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table rowKey="_id" rowClassName="gateway-list" columns={columns} dataSource={gatewayList} />
  );
}
