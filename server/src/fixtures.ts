import mongoose, { connect, connection, Model } from "mongoose";
import env from './configs/env-config';
import { GateWay, GateWaySchema } from "./gateways/models/gateway.schema";
import gatewayFakeData from "../test/fakedata/gateway";

(async function () {
    await connect(env.MONGODB_URI);
  
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }

    let gatewayModel: Model<GateWay>;
    gatewayModel = mongoose.model('GateWaySchema', GateWaySchema);

    for (let i = 0; i < gatewayFakeData.length; i++) {
        await gatewayModel.create(gatewayFakeData[i]);
    }

    await connection.close()
  })();