import { useState } from 'react';
import {
  Card, Typography, Button, Modal, Form, Input as AntInput, Alert, Col, Row, Statistic,
} from 'antd';
import {
  PlusOutlined,
  CheckCircleTwoTone,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { getGatewayDetail } from '../../../services/gateway';
import { openNotificationWithIcon } from '../../../common/notifications/notifications';
import { GatewayDetailI } from '../../../interfaces/gateway';
import '../styles/index.less';
import GatewayList from '../component/GatewayList';
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

  const { loading } = useFetch(
    getGatewayDetail(id),
    (gateway: GatewayDetailI) => {
      setGatewayD(gateway);
    },
    (error: Error) => {
      openNotificationWithIcon('error', 'Error', error.message);
    },
  );

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
          padding: '20px',
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
          >
            Create
          </Button>
        </StyledDivContainer>
        <DeviceList deviceList={gatewayD.devices} />
      </Card>
    </>
  );
}
