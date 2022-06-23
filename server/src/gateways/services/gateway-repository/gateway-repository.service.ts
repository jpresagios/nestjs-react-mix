import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { GateWayDocument } from 'src/gateways/models/gateway.schema';

@Injectable()
export class GatewayRepositoryService {
  private readonly logger = new Logger(GatewayRepositoryService.name);

  constructor(
    @InjectModel('GateWaySchema')
    private readonly gateWay: Model<GateWayDocument>,
  ) {}

  async insert(gateWayData): Promise<any> {
    const gateWay = new this.gateWay(gateWayData);
    const resultFromDB = await gateWay.save();

    return resultFromDB;
  }

  async findById(idGateWay): Promise<any> {
    const gateWay = await this.gateWay.findById(idGateWay).populate('devices');

    return gateWay;
  }

  async findAll(): Promise<any> {
    try {
      const allGateWay = await this.gateWay.find().populate('devices');
      return allGateWay;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async findBySerialNumber(serialNumber): Promise<any> {
    const gateWay = await this.gateWay.findOne({ serialNumber });

    return gateWay;
  }

  async getNumberDevice(idGateWay): Promise<any> {
    const gateWay = await this.gateWay.findById(idGateWay);

    if (gateWay) {
      return gateWay.devices.length;
    }

    return 0;
  }
}
