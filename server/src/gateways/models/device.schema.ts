import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { GateWay } from './gateway.schema';

export type DeviceDocument = Device & Document;

@Schema()
export class Device {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: GateWay.name })
  gateWay: GateWay;

  @Prop({ required: true })
  uid: number;

  @Prop()
  vendor: string;

  @Prop({ default: Date.now })
  createAt: Date;

  @Prop()
  status: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
