import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { GateWayNumberDevices } from './gateway-validator-numberdevices';

export class DeviceRequest {
  @ApiProperty()
  @IsNotEmpty()
  uid: number;

  @ApiProperty()
  @IsNotEmpty()
  vendor: string;

  createAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  status: string;

  @ApiProperty()
  @Validate(GateWayNumberDevices)
  idGateway: string;
}
