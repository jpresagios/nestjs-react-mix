import { Test } from '@nestjs/testing';
import { BadRequestException, INestApplication } from '@nestjs/common';
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
    app.useGlobalPipes(new ValidationPipe({
      exceptionFactory: (errors) => new BadRequestException(errors)
    }));
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

  it('/device (POST) bad request with empty uid',  async () => {
    const gateWayDB = await gatewayModel.create(gateWayFakeData[0]);

    const device = {
      idGateWay: gateWayDB._id,
      vendor: "vendor1",
      status: "online",
    };

    const {status, body: {message}} = await request(app.getHttpServer()).post('/device').send(device);
    
    const errorFromAPI = Object.values(message[0].constraints);

    expect(status).toEqual(400);
    expect(errorFromAPI).toEqual(['uid should not be empty']);
  });

  it('/device (POST) bad request with empty vendor',  async () => {
    const gateWayDB = await gatewayModel.create(gateWayFakeData[0]);

    const device = {
      idGateWay: gateWayDB._id,
      uid: 4,
      status: "online",
    };

    const {status, body: {message}} = await request(app.getHttpServer()).post('/device').send(device);
    
    const errorFromAPI = Object.values(message[0].constraints);

    expect(status).toEqual(400);
    expect(errorFromAPI).toEqual(['vendor should not be empty']);
  });


  it('/device (POST) bad request with empty status',  async () => {
    const gateWayDB = await gatewayModel.create(gateWayFakeData[0]);

    const device = {
      idGateWay: gateWayDB._id,
      uid: 4,
      vendor: "vendor1"
    };

    const {status, body: {message}} = await request(app.getHttpServer()).post('/device').send(device);

    const errorFromAPI = Object.values(message[0].constraints);

    expect(status).toEqual(400);
    expect(errorFromAPI).toEqual(['status should not be empty']);
  });
});
