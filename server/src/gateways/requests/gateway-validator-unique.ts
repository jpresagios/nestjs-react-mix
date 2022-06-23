import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { GatewayRepositoryService } from '../services/gateway-repository/gateway-repository.service';

@ValidatorConstraint({ name: 'GateWayIsUnique', async: true })
@Injectable()
export class GateWayIsUnique implements ValidatorConstraintInterface {
  constructor(private gateWayRepository: GatewayRepositoryService) {}

  async validate(serialNumber: number) {
    const result = await this.gateWayRepository.findBySerialNumber(
      serialNumber,
    );

    return result === null;
  }

  defaultMessage(_) {
    return `serialNumber must be unique`;
  }
}
