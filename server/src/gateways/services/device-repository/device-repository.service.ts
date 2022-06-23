import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GateWayDocument } from 'src/gateways/models/gateway.schema';
import { DeviceDocument } from 'src/gateways/models/device.schema';

@Injectable()
export class DeviceRepositoryService {
  private readonly logger = new Logger(DeviceRepositoryService.name);
  constructor(
    @InjectModel('GateWaySchema')
    private readonly gateWay: Model<GateWayDocument>,
    @InjectModel('DeviceSchema') private readonly device: Model<DeviceDocument>,
  ) {}

  async addDevice(idGateWay, deviceData): Promise<any> {
    const device = new this.device(deviceData);

    const result = await device.save();

    await this.gateWay.findOneAndUpdate(
      { _id: idGateWay },
      { $push: { devices: result } },
    );

    return result;
  }

  async removeDevice(idDevice): Promise<any> {
    try {
      const device = await this.device.findById(idDevice);
      const result = await device.remove();

      return result;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
