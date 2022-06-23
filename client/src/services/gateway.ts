// import axios from '../data/api/request';
import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const getGateways = () => axios.get('http://localhost:3000/gateway');
