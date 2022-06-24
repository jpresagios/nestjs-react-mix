import axios from 'axios';
import { GatewayI, DevicePayloadI } from '../interfaces/gateway';

// eslint-disable-next-line import/prefer-default-export
export const getGateways = () => axios.get('http://localhost:3000/gateway');

export const createGateway = (payload: GatewayI) => axios.post('http://localhost:3000/gateway', payload);

export const getGatewayDetail = (id: string | undefined) => axios.get(`http://localhost:3000/gateway/${id}`);

export const createDevice = (payload: DevicePayloadI) => axios.post('http://localhost:3000/device', payload);

export const deleteDevice = (id: string) => axios.delete(`http://localhost:3000/device/${id}`);
