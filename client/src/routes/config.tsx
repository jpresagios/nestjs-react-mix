import { FC, Suspense } from 'react';
import { RouteProps } from 'react-router';
import { PageLoading } from '@ant-design/pro-layout';

export interface WrapperRouteProps extends RouteProps {
  titleId: string;
  element: JSX.Element;
  auth?: boolean;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({
  titleId, auth, element,
}) => {
  if (titleId) {
    document.title = titleId;
  }

  return (
    <Suspense fallback={<PageLoading />}>
        {element}
    </Suspense>
  );
};

export default WrapperRouteComponent;
