import { useState } from 'react';
import {
  Space, Table, Button, Tooltip, Badge, Modal,
} from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import { IDevice } from '../../../interfaces/gateway';
import { deleteDevice } from '../../../services/gateway';
import './list-row.less';
import { openNotificationWithIcon } from '../../../common/notifications/notifications';

interface DeviceListI {
  deviceList: IDevice[];
  onDeleteDevice: (id: string)=>void
}

const { confirm } = Modal;

export default function DeviceList({ deviceList, onDeleteDevice }:DeviceListI) {
  const columns: ColumnsType<IDevice> = [
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
        <HandleDeleteOption id={_id} onDeleteDevice={onDeleteDevice} />
      ),
    },
  ];

  return (
    <Table rowKey="_id" rowClassName="gateway-list" columns={columns} dataSource={deviceList} />
  );
}

interface IHandleDeleteOptionProps {
  id: string;
  onDeleteDevice: (id: string)=>void
}

const HandleDeleteOption = ({ id, onDeleteDevice }:IHandleDeleteOptionProps) => {
  const [loading, setLoading] = useState(false);

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this device?',
      icon: <ExclamationCircleOutlined />,
      content: 'If you remove it you can revert this action',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setLoading(true);
        deleteDevice(id)
          .then(() => {
            setLoading(false);
            onDeleteDevice(id);
          })
          .catch(() => {
            setLoading(false);
            openNotificationWithIcon('error', 'Error', 'Something went wrong :(');
          });
      },
    });
  };

  return (
    <Space size="middle">
      <Tooltip title="Detail">
        <Button
          loading={loading}
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
          danger
          onClick={showDeleteConfirm}
        />
      </Tooltip>
    </Space>
  );
};
