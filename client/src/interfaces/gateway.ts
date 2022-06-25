export interface GatewayI {
  _id: string;
  serialNumber: string;
  name: string;
  ipV4: string;
}

export interface IGatewayDetail {
  _id: string;
  serialNumber: string;
  name: string;
  ipV4: string;
  devices: IDevice[];
}

export interface IDevice {
  createAt: string;
  status: string;
  uid: string;
  vendor: string;
  _id: string;
}
export interface IDevicePayload {
  uid: string;
  vendor: string;
  status: string;
  idGateway?: string;
}
