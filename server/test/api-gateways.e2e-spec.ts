import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { GatewaysModule } from './../src/gateways/gateways.module';
import {
  GateWay,
  GateWaySchema
} from './../src/gateways/models/gateway.schema';
import mongoose, { Connection, connect, Model } from 'mongoose';
import gateWayFakeData from './fakedata/gateway';

describe('GateWayController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture;
  let mongoConnection: Connection;
  let gatewayModel: Model<GateWay>;

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
    // await connect();
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
    gatewayModel = mongoConnection.model('GateWaySchema', GateWaySchema);
    await app.init();
  });

  it('/gateways (GET) returned all the gateways in the DB',  async () => {
    for (let i = 0; i < gateWayFakeData.length; i++) {
      await gatewayModel.create(gateWayFakeData[i]);
    }

    const result = await request(app.getHttpServer()).get('/gateway');

    const data = JSON.parse(result.text);

    expect(result.status).toBe(200);
    expect(data.length).toEqual(gateWayFakeData.length);
  });


  it('/gateways (GET) detail endpoint',  async () => {
    const gateWay = gateWayFakeData[0];

    const resultDB = await gatewayModel.create(gateWay);

    const {body: {name, serialNumber, ipV4}} = await request(app.getHttpServer()).get(`/gateway/${resultDB._id}`);

    
    expect(name).toEqual(gateWay.name);
    expect(serialNumber).toEqual(gateWay.serialNumber);
    expect(ipV4).toEqual(gateWay.ipV4);
  });


  it('/gateways (POST) endpoint inserted new gateways',  async () => {
    const gateWay = gateWayFakeData[0];
    const {body: {name, serialNumber, ipV4}} = await request(app.getHttpServer()).post('/gateway').send(gateWay);

    
    expect(name).toEqual(gateWay.name);
    expect(serialNumber).toEqual(gateWay.serialNumber);
    expect(ipV4).toEqual(gateWay.ipV4);
  });
});