import mongoose, { connect, connection, Model } from 'mongoose';
import env from './configs/env-config';
import { GateWay, GateWaySchema, GateWayDocument } from './gateways/models/gateway.schema';
import { Device, DeviceDocument, DeviceSchema } from './gateways/models/device.schema';
import gatewayFakeData from '../test/fakedata/gateway';
import deviceFakeData from '../test/fakedata/device';

(async function () {
    await connect(env.MONGODB_URI);

    const gatewayModel: Model<GateWay> = mongoose.model('GateWaySchema', GateWaySchema);
    const deviceModel: Model<Device> = mongoose.model('DeviceSchema', DeviceSchema);
    await gatewayModel.deleteMany({});
    await deviceModel.deleteMany({});

    for (let i = 0; i < gatewayFakeData.length; i++) {
        const gateWayDB = await gatewayModel.create(gatewayFakeData[i]);

        const device = await deviceModel.create(deviceFakeData[i]);
        const deviceDB = await device.save();

        await gatewayModel.findOneAndUpdate(
          { _id: gateWayDB._id },
          { $push: { devices: deviceDB } },
        );
    }

    await connection.close()
  })();