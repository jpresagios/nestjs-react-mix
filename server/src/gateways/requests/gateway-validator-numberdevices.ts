import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { GatewayRepositoryService } from '../services/gateway-repository/gateway-repository.service';

@ValidatorConstraint({ name: 'GateWayNumberDevices', async: true })
@Injectable()
export class GateWayNumberDevices implements ValidatorConstraintInterface {
  constructor(private gateWayRepository: GatewayRepositoryService) {}

  async validate(idGateWay: number) {
    const numberDevice = await this.gateWayRepository.getNumberDevice(
      idGateWay,
    );

    return numberDevice <= 10;
  }

  defaultMessage(_) {
    return 'The gateway that you tried to added the device contains 10 devices already';
  }
}
