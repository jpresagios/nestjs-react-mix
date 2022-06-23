import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, Validate } from 'class-validator';
import { GateWayIsUnique } from './gateway-validator-unique';

export class GateWayRequest {
  @ApiProperty()
  @IsNotEmpty()
  @Validate(GateWayIsUnique)
  serialNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    {
      message: 'IPV4 is not valid',
    },
  )
  ipV4: string;
}
