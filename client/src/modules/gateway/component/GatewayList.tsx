import React from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import styled from 'styled-components';
import { GatewayI } from '../../../interfaces/gateway';
import './templateList.less';

const StyledTextFirstCol = styled.span`
  margin-left: 16px; 
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #333333;
`;

const StyledText = styled.span`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #333333;
`;

interface GatewayListI {
  gatewayList: GatewayI[];
}

export default function GatewayList({ gatewayList }: GatewayListI) {
  const columns: ProColumns<GatewayI>[] = [
    {
      title: <span style={{ marginLeft: 16 }}>Serial Number</span>,
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      render: (r, record) => (
        <StyledTextFirstCol>
          {record?.serialNumber}
        </StyledTextFirstCol>
      ),
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      render: (r, record) => (
        <StyledText>
          {record?.name}
        </StyledText>
      ),
    },
    {
      title: 'ipV4',
      dataIndex: 'ipV4',
      key: 'ipV4',
      render: (r, record) => (
        <StyledText>
          {record?.ipV4}
        </StyledText>
      ),
    },
  ];

  return (
    <ProTable<GatewayI>
      className="custom-table-gateways"
      columns={columns}
      rowKey="_id"
      rowClassName={() => ('custom-row')}
      defaultData={gatewayList || []}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      search={false}
      options={false}
    />
  );
}
