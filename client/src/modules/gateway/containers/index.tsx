import { useState } from 'react';
import { Card, Typography } from 'antd';
import useFetch from '../../../hooks/useFetch';
import { getGateways } from '../../../services/gateway';
import { openNotificationWithIcon } from '../../../common/notifications/notifications';
import { GatewayI } from '../../../interfaces/gateway';
import '../styles/index.less';
import GatewayList from '../component/GatewayList';

const { Title } = Typography;

const getGatewayPromise = getGateways();

export default function index() {
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

  return (
    <div className="custom-container">
      <Title level={3}>
        Gateways
      </Title>
      <Card
        className="container-card"
        loading={loading}
        style={{ marginTop: 17 }}
        bodyStyle={{
          padding: '0px',
        }}
      >
        <GatewayList gatewayList={data} />
        {/* {data && data.template.length ? (
         <TemplatesList
           items={data ? data.template : []}
           totalItems={data?.template_aggregate.aggregate.totalCount}
         />
         ) : (
          <TemplatesEmpty />
         )} */}
      </Card>
    </div>
  );
}
