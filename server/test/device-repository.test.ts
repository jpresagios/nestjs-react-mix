import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

import {
  GateWay,
  GateWaySchema,
} from './../src/gateways/models/gateway.schema';

import {
  DeviceSchema
} from './../src/gateways/models/device.schema';

import mongoose, { Connection, connect, Model } from 'mongoose';
import gateWayFakeData from './fakedata/gateway';
import deviceFakeData from './fakedata/device';
import { GatewayRepositoryService } from './../src/gateways/services/gateway-repository/gateway-repository.service';
import { DeviceRepositoryService } from './../src/gateways/services/device-repository/device-repository.service';


describe('GateWayRepository service', () => {
  let app: INestApplication;
  let moduleFixture;
  let mongoConnection: Connection;
  let gatewayModel: Model<GateWay>;
  let gateWayServiceRepository: GatewayRepositoryService;
  let deviceServiceRepository: DeviceRepositoryService;

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
      providers: [GatewayRepositoryService, DeviceRepositoryService],
      imports: [
        MongooseModule.forFeature([
          { name: 'GateWaySchema', schema: GateWaySchema },
          { name: 'DeviceSchema', schema: DeviceSchema },
        ]),
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
        AppModule,
      ],
    }).compile();



    app = moduleFixture.createNestApplication();
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe());

    gatewayModel = mongoConnection.model('GateWaySchema', GateWaySchema);
    gateWayServiceRepository = app.get<GatewayRepositoryService>(GatewayRepositoryService);
    deviceServiceRepository = app.get<DeviceRepositoryService>(DeviceRepositoryService);
    await app.init();
  });

  it('test /device addDevice method',  async () => {
    const gateWay = await gateWayServiceRepository.insert(gateWayFakeData[0]);
    const device = deviceFakeData[0];

    const deviceResult = await deviceServiceRepository.addDevice(gateWay._id, device);

    expect(deviceResult.status).toEqual(device.status);
    expect(deviceResult.vendor).toEqual(device.vendor);
    expect(deviceResult.uid).toEqual(device.uid);
  });


  it('test /gateway repository findById method',  async () => {
    const gateWay = gateWayFakeData[0];

    const gateWayResult = await gateWayServiceRepository.insert(gateWay);
    const gateWayDetail = await gateWayServiceRepository.findById(gateWayResult._id);

    const { _id, serialNumber, name, ipV4 } = gateWayDetail;
    expect(_id).toEqual(gateWayResult._id);
    expect(serialNumber).toEqual(gateWayResult.serialNumber);
    expect(name).toEqual(gateWayResult.name);
    expect(ipV4).toEqual(gateWayResult.ipV4);
  });
});
