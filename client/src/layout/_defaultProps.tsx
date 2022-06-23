import {
  GatewayOutlined
} from '@ant-design/icons';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/gateways',
        name: 'Gateways',
        icon: <GatewayOutlined />,
        locale: 'Gateways',
        exact: true,
      },
    ],
  },
  location: {
    pathname: '/',
  },
};
