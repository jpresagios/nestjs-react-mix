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
import mongoose, { Connection, connect, Model } from 'mongoose';
import gateWayFakeData from './fakedata/gateway';

describe('GateWayController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture;
  let mongoConnection: Connection;
  let gatewayModel: Model<GateWay>;

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

    const {status, body: {name, serialNumber, ipV4}} = await request(app.getHttpServer()).get(`/gateway/${resultDB._id}`);
    expect(status).toBe(200);
    
    expect(name).toEqual(gateWay.name);
    expect(serialNumber).toEqual(gateWay.serialNumber);
    expect(ipV4).toEqual(gateWay.ipV4);
  });


  it('/gateways (POST) endpoint inserted new gateways',  async () => {
    const gateWay = gateWayFakeData[0];
    const {status, body: {name, serialNumber, ipV4}} = await request(app.getHttpServer()).post('/gateway').send(gateWay);
    expect(status).toBe(201);
    
    expect(name).toEqual(gateWay.name);
    expect(serialNumber).toEqual(gateWay.serialNumber);
    expect(ipV4).toEqual(gateWay.ipV4);
  });


  it('/gateways (POST) bad request with invalid ipV4',  async () => {
    
    const {status, body: {message}} = await request(app.getHttpServer()).post('/gateway').send({
      name: "name1",
      serialNumber: "serial1",
      ipV4: "270.4.17.5",
    });

    expect(status).toEqual(400);
    expect(message).toEqual(['IPV4 is not valid']);
  });

  it('/gateways (POST) bad request with empty name',  async () => {
    
    const {status, body: {message}} = await request(app.getHttpServer()).post('/gateway').send({
      serialNumber: "serial1",
      ipV4: "27.4.17.5",
    });

    expect(status).toEqual(400);
    expect(message).toEqual(['name should not be empty']);
  });

  it('/gateways (POST) bad request with empty serialNumber',  async () => {
    
    const {status, body: {message}} = await request(app.getHttpServer()).post('/gateway').send({
      name: "name1",
      ipV4: "27.4.17.5",
    });

    expect(status).toEqual(400);
    expect(message).toEqual(['serialNumber should not be empty']);
  });


  it('/gateways (POST) bad request with duplicate serialNumber',  async () => {
    
    await gatewayModel.create({
      name: "name2",
      ipV4: "27.4.16.5",
      serialNumber: "serial1"
    });

    const {status, body: {message}} = await request(app.getHttpServer()).post('/gateway').send({
      name: "name1",
      ipV4: "27.4.17.5",
      serialNumber: "serial1"
    });

    expect(status).toEqual(400);
    expect(message).toEqual(['serialNumber must be unique']);
  });
});
