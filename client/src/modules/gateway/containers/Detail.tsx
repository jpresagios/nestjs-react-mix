/* eslint-disable no-bitwise */
import { useState } from 'react';
import {
  Card, Typography, Button, Modal, Form, Input as AntInput, Col, Row, Statistic, Switch,
} from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { getGatewayDetail, createDevice } from '../../../services/gateway';
import { openNotificationWithIcon } from '../../../common/notifications/notifications';
import { GatewayDetailI, DevicePayloadI } from '../../../interfaces/gateway';
import '../styles/index.less';
import DeviceList from '../component/DeviceList';

const { Title } = Typography;

const StyledDivContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 20px 0;
`;

export default function Detail() {
  const { id } = useParams();
  const [gatewayD, setGatewayD] = useState<GatewayDetailI>({
    _id: '',
    serialNumber: '',
    name: '',
    ipV4: '',
    devices: [],
  });
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const { loading } = useFetch(
    () => getGatewayDetail(id),
    (gateway: GatewayDetailI) => {
      setGatewayD(gateway);
    },
    (error: Error) => {
      openNotificationWithIcon('error', 'Error', error.message);
    },
  );

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    form.submit();
  };

  const onFinish = (values: DevicePayloadI) => {
    const payload: DevicePayloadI = {
      ...values,
      idGateway: id,
      status: values.status ? 'online' : 'offline',
    };
    setConfirmLoading(true);
    createDevice(payload)
      .then((response) => {
        const {
          data: {
            uid, vendor, status, _id, createAt,
          },
        } = response;
        const newDevice = {
          uid, vendor, status, _id, createAt,
        };
        setGatewayD({
          ...gatewayD,
          devices: [newDevice, ...gatewayD.devices],
        });
        form.resetFields();
        setConfirmLoading(false);
        setVisible(false);
      })
      .catch(() => {
        openNotificationWithIcon('error', 'Error', 'Something went wrong :(');
        setConfirmLoading(false);
      });
  };

  const onDeleteDevice = (deviceId: string) => {
    setGatewayD({
      ...gatewayD,
      // eslint-disable-next-line no-underscore-dangle
      devices: gatewayD.devices.filter((device) => device._id !== deviceId),
    });
  };

  return (
    <>
      <Title level={3}>
        Gateway detail
      </Title>
      <Card
        className="container-card"
        loading={loading}
        style={{ marginTop: 17 }}
        bodyStyle={{
          padding: 20,
        }}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Statistic title="Serial Number" value={gatewayD.serialNumber} />
          </Col>
          <Col span={8}>
            <Statistic title="Name" value={gatewayD.name} />
          </Col>
          <Col span={8}>
            <Statistic title="IpV4" value={gatewayD.ipV4} />
          </Col>
        </Row>
        <hr />
        <StyledDivContainer>
          <Title level={3}>
            Device list
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={showModal}
          >
            Create
          </Button>
        </StyledDivContainer>
        <DeviceList deviceList={gatewayD.devices} onDeleteDevice={onDeleteDevice} />
      </Card>
      <Modal
        title="Create device"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          onFinish={onFinish}
        >
          <Form.Item
            name="uid"
            rules={[{ required: true, message: 'Required' }]}
          >
            <AntInput type="number" suffix={<span />} size="large" placeholder="Uid" />
          </Form.Item>
          <Form.Item
            name="vendor"
            rules={[{ required: true, message: 'Required' }]}
          >
            <AntInput suffix={<span />} size="large" placeholder="Vendor" />
          </Form.Item>
          <Form.Item
            name="status"
            valuePropName="checked"
            initialValue
          >
            <Switch defaultChecked />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
