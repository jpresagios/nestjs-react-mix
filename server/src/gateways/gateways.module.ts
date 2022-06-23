import { Module } from '@nestjs/common';
import { GatewayController } from './controllers/gateway.controller';
import { GatewayRepositoryService } from './services/gateway-repository/gateway-repository.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GateWaySchema } from './models/gateway.schema';
import { DeviceSchema } from './models/device.schema';
import { DeviceController } from './controllers/device.controller';
import { DeviceRepositoryService } from './services/device-repository/device-repository.service';
import { GateWayIsUnique } from './requests/gateway-validator-unique';
import { GateWayNumberDevices } from './requests/gateway-validator-numberdevices';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'GateWaySchema', schema: GateWaySchema },
      { name: 'DeviceSchema', schema: DeviceSchema },
    ]),
  ],
  controllers: [GatewayController, DeviceController],
  providers: [
    GatewayRepositoryService,
    DeviceRepositoryService,
    GateWayIsUnique,
    GateWayNumberDevices,
  ],
})
export class GatewaysModule {}
