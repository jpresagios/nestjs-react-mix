import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { GatewaysModule } from './../src/gateways/gateways.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

import {
  GateWay,
  GateWaySchema,
} from './../src/gateways/models/gateway.schema';

import {
  Device,
  DeviceSchema,
} from './../src/gateways/models/device.schema';

import mongoose, { Connection, connect, Model } from 'mongoose';
import gateWayFakeData from './fakedata/gateway';

describe('DeviceController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture;
  let mongoConnection: Connection;
  let gatewayModel: Model<GateWay>;
  let deviceModel: Model<Device>;

  afterEach(async () => {
    // gatewayModel.deleteMany({});
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  afterAll(done => {
      app.close()
      done();
  })

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            mongoConnection = (await connect(uri)).connection;
            return {
              uri: uri,
            };
          },
        }),
        GatewaysModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    useContainer(app.select(GatewaysModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe());

    gatewayModel = mongoConnection.model('GateWaySchema', GateWaySchema);
    deviceModel = mongoConnection.model('DeviceSchema', DeviceSchema);
    await app.init();
  });

  it('/device (POST) endpoint inserted new devices',  async () => {
    const numberDevicesBeforeCallEndpoint = await deviceModel.count({});
    const gateWayDB = await gatewayModel.create(gateWayFakeData[0]);

    expect(numberDevicesBeforeCallEndpoint).toEqual(0);

    const device = {
      idGateWay: gateWayDB._id,
      uid: 1,
      vendor: "vendor1",
      status: "online",
    };

    const {status, body: {uid, vendor, status: statusDevice}} = await request(app.getHttpServer()).post('/device').send(device);
    const numberDevicesAfterCallEndpoint = await deviceModel.count({});
    expect(status).toEqual(201);

    expect(device.uid).toEqual(uid);
    expect(device.vendor).toEqual(vendor);
    expect(device.status).toEqual(statusDevice);

    expect(numberDevicesAfterCallEndpoint).toEqual(1);
  });
});
