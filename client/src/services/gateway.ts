import axios from 'axios';
import { GatewayI, DevicePayloadI } from '../interfaces/gateway';
import env from '../configs/env-config';

// eslint-disable-next-line import/prefer-default-export

// create axios config services

const domain = env.REACT_APP_URL;
export const getGateways = () => axios.get(`${domain}/gateway`);

export const createGateway = (payload: GatewayI) => axios.post(`${domain}/gateway`, payload);

export const getGatewayDetail = (id: string | undefined) => axios.get(`${domain}/gateway/${id}`);

export const createDevice = (payload: DevicePayloadI) => axios.post(`${domain}/device`, payload);

export const deleteDevice = (id: string) => axios.delete(`${domain}/device/${id}`);
