import { lazy, FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { RouteObject } from 'react-router';
import Layout from '../layout/Layout';
import WrapperRouteComponent from './config';
import importRetry from './importRetry';

const Gateway = lazy(() => importRetry(() => import('../modules/gateway/containers/index')));
const GatewayDetail = lazy(() => importRetry(() => import('../modules/gateway/containers/Detail')));
const NotFound = lazy(() => importRetry(() => import('../modules/pages/404')));

const routeList: RouteObject[] = [
  {
    path: '/',
    element: <WrapperRouteComponent element={<Layout />} titleId="" auth />,
    children: [
      {
        path: 'gateways',
        element: <WrapperRouteComponent element={<Gateway />} titleId="Gateway list" auth />,
      },
      {
        path: 'gateway/:id',
        element: <WrapperRouteComponent element={<GatewayDetail />} titleId="Gateway detail" auth />,
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId="Page not found" auth />,
      },
    ],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
