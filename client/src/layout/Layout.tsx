import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import {
  Grid,
} from 'antd';
import { SwitcherOutlined } from '@ant-design/icons'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, {
  PageContainer,
} from '@ant-design/pro-layout';
// import logoSvg from '@assets/images/logo.svg';
import defaultProps from './_defaultProps';
import './layout.less';

const { useBreakpoint } = Grid;

const Layout: React.FC = () => {
  const [settings] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    fixedHeader: true,
  });
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState<boolean>(false)

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/gateways');
    } else {
      setPathname(location.pathname);
    }
  }, [location, navigate]);

  const toggleCollapsed = () => {
    localStorage.setItem('collapsed', String(!collapsed));
    setCollapsed(!collapsed)
  };

  return (
    <div
      id="custom-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        {...settings}
        location={{
          pathname,
        }}
        menuProps={{
          theme: 'dark',
          mode: 'inline',
        }}
        title="Engage"
        onCollapse={toggleCollapsed}
        collapsed={collapsed}
        collapsedButtonRender={false}
        logo={!screens.xs ? <SwitcherOutlined style={{color: 'wheat', fontSize: 38}}/> : null}
        menuHeaderRender={(logo: any) => (
          <>
            <span
              onClick={() => {
                navigate('/gateways');
              }}
            >
              {logo}
            </span>
            {!collapsed && !screens.xs && (
            <div
              onClick={toggleCollapsed}
              style={{
                cursor: 'pointer',
                fontSize: '16px',
                color: 'white',
              }}
            >
              <MenuFoldOutlined />
            </div>
            )}
          </>
        )}
        headerContentRender={() => (collapsed ? (
          <div
            onClick={toggleCollapsed}
            style={{
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            <MenuUnfoldOutlined />
          </div>
        ) : null)}
        // formatMessage={(message) => formatMessage(message)}
        menuItemRender={(menuItemProps: any, defaultDom: any) => {
          if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
            return defaultDom;
          }

          return (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              onClick={() => {
                setPathname(menuItemProps.path || '/gateways');
                navigate(menuItemProps.path || '/gateways');
              }}
            >
              {defaultDom}
            </a>
          );
        }}
        onPageChange={() => {
          window.scrollTo(0, 0);
        }}
      >
        <PageContainer
          ghost
          header={{
            title: '',
            breadcrumb: {},
            style: {
              background: 'rgba(255, 185, 70, 0.1)',
              height: 49,
            },
          }}
        >
          <div
            style={{
              height: '120vh',
              padding: screens.xs ? '20px 0px' : '20px 29px 20px 34px',
            }}
          >
            <Outlet />
          </div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};

export default Layout;
