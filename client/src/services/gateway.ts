import axios from 'axios';
import { GatewayI } from '../interfaces/gateway';

// eslint-disable-next-line import/prefer-default-export
export const getGateways = () => axios.get('http://localhost:3000/gateway');

export const createGateway = (payload: GatewayI) => axios.post('http://localhost:3000/gateway', payload);
