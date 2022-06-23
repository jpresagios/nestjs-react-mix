import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { DeviceDocument } from './device.schema';

export type GateWayDocument = GateWay & Document;

@Schema()
export class GateWay {
  @Prop()
  serialNumber: string;

  @Prop()
  name: string;

  @Prop()
  ipV4: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'DeviceSchema' }])
  devices: DeviceDocument[];
}

export const GateWaySchema = SchemaFactory.createForClass(GateWay);
