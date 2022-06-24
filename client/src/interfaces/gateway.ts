export interface GatewayI {
  _id: string;
  serialNumber: string;
  name: string;
  ipV4: string;
}

export interface GatewayDetailI {
  _id: string;
  serialNumber: string;
  name: string;
  ipV4: string;
  devices: DeviceI[];
}

export interface DeviceI {
  createAt: string;
  status: string;
  uid: string;
  vendor: string;
  _id: string;
}
export interface DevicePayloadI {
  uid: string;
  vendor: string;
  status: string;
  idGateway?: string;
}
