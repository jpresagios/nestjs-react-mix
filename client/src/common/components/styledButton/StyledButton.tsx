import { Button as AntButton } from 'antd';
import styled, { css } from 'styled-components';

const typePrimary = css`
  background: #6579FF;
  border-radius: 5px;
  &:hover,
  &:focus {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    background:#6579FF;
  }
  &:active {
    background:#553680;
    border-color: transparent;
  }
  &:disabled,
  [disabled] {
    color: white;
    background: rgba(101, 121, 255, 0.3);
    border-color: transparent;
    &:hover {
      color: white;
      background: rgba(101, 121, 255, 0.3);
      border-color: transparent;
    }
  }
`;
const typeSecondary = css`
  background: #FFFFFF;
  color: #6579FF;
  border: 1px solid #6579FF;
  box-sizing: border-box;
  border-radius: 5px;
  &:hover,
  &:focus {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    color: #6579FF;
  }
  &:active {
    border: 1px solid #553680;
    color: #553680;
  }
  &:disabled,
  [disabled] {
    border: 1px solid rgba(101, 121, 255, 0.3);
    color: rgba(101, 121, 255, 0.3);
    background: #FFFFFF;
    &:hover {
      border: 1px solid rgba(101, 121, 255, 0.3);
      color: rgba(101, 121, 255, 0.3);
      background: #FFFFFF;
    }
  }
`;

const typeLink = css`
  padding: 0px;
  height: fit-content;
  width: fit-content;
  color: #6579FF;
  font-weight: 700;
  &:hover,
  &:focus {
    color: #6579FF;
    background: rgba(101, 121, 255, 0.1);
    border-radius: 10px;
  }
  &:active {
    color: #553680;
  }
  &:disabled,
  [disabled] {
    color: rgba(101, 121, 255, 0.3);
    &:hover {
      color: rgba(101, 121, 255, 0.3);
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const StyledButton = styled(AntButton)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 12px !important;
  line-height: 16px;
  text-align: center;
  padding: 11px 24px 13px;
  height: 40px;

  ${(props: { type: string; }) => props.type === 'primary' && typePrimary}
  ${(props: { type: string; }) => props.type === 'default' && typeSecondary}
  ${(props: { type: string; }) => props.type === 'link' && typeLink}
`;
