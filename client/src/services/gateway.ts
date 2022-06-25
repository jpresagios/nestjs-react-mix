import { GatewayI, IDevicePayload } from '../interfaces/gateway';
import axios from '../axios';

export const getGateways = () => axios.get('/gateway');

export const createGateway = (payload: GatewayI) => axios.post('/gateway', payload);

export const getGatewayDetail = (id: string | undefined) => axios.get(`/gateway/${id}`);

export const createDevice = (payload: IDevicePayload) => axios.post('/device', payload);

export const deleteDevice = (id: string) => axios.delete(`/device/${id}`);
