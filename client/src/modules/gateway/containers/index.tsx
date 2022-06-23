import { useState } from 'react';
import {
  Card, Typography, Button, Modal, Form, Input as AntInput, Alert,
} from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import useFetch from '../../../hooks/useFetch';
import { getGateways, createGateway } from '../../../services/gateway';
import { openNotificationWithIcon } from '../../../common/notifications/notifications';
import { GatewayI } from '../../../interfaces/gateway';
import '../styles/index.less';
import GatewayList from '../component/GatewayList';

const { Title } = Typography;

const getGatewayPromise = getGateways();

const StyledDivContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function index() {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [customErrors, setCustomErrors] = useState<string[]>([]);
  const [data, setData] = useState<GatewayI[]>([]);

  const { loading } = useFetch(
    getGatewayPromise,
    (gateways: GatewayI[]) => {
      setData(gateways);
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

  const onFinish = (values: GatewayI) => {
    setConfirmLoading(true);
    createGateway(values)
      .then((response) => {
        const {
          data: {
            ipV4, name, serialNumber, _id,
          },
        } = response;
        const newGateway = {
          ipV4, name, serialNumber, _id,
        };
        setData([newGateway, ...data]);
        form.resetFields();
        setConfirmLoading(false);
        setVisible(false);
      })
      .catch((error) => {
        const { statusCode, message } = error.response.data;
        if (+statusCode === 400) {
          setCustomErrors(message);
        }
        openNotificationWithIcon('error', 'Error', 'Something went wrong :(');
        setConfirmLoading(false);
      });
  };

  return (
    <>
      <StyledDivContainer>
        <Title level={3}>
          Gateways
        </Title>
        <Button type="primary" icon={<PlusOutlined />} size="large" onClick={showModal}>
          Create
        </Button>
      </StyledDivContainer>
      <Card
        className="container-card"
        loading={loading}
        style={{ marginTop: 17 }}
        bodyStyle={{
          padding: '0px',
        }}
      >
        <GatewayList gatewayList={data} />
      </Card>
      <Modal
        title="Create gateway"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {customErrors.length > 0 && (
          <Alert
            message="Error"
            // eslint-disable-next-line react/no-array-index-key
            description={<div>{customErrors.map((item, i) => <p key={i}>{item}</p>)}</div>}
            type="error"
            showIcon
            style={{ marginBottom: 5 }}
          />
        )}
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          onFinish={onFinish}
        >
          <Form.Item
            name="serialNumber"
            rules={[{ required: true, message: 'Required' }]}
          >
            <AntInput suffix={<span />} size="large" placeholder="Serial number" />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Required' }]}
          >
            <AntInput suffix={<span />} size="large" placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="ipV4"
            rules={[{ required: true, message: 'Required' }]}
          >
            <AntInput suffix={<span />} size="large" placeholder="IpV4" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
