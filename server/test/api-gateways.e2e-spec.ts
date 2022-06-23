import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { GatewaysModule } from './../src/gateways/gateways.module';
import {
  GateWaySchema,
  IGateWay,
} from './../src/gateways/models/gateway.schema';
import { Connection, connect, Model } from 'mongoose';

describe('GateWayController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture;
  let mongoConnection: Connection;
  let gatewayModel: Model<IGateWay>;

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

  it('/gateways (GET)', async () => {
    await gatewayModel.create({
      serialNumber: 'casad',
      ipV4: '4.5.5.5',
      name: '3434',
    });

    await gatewayModel.create({
      serialNumber: 'anottttttttttttttthier Junior Paz Formoso',
      ipV4: '4.5.5.5',
      name: '3434',
    });

    const result = await request(app.getHttpServer()).get('/gateway');

    const res = JSON.parse(result.text);

    console.log('tttttttttttttttttttttt');
    console.log(res);
    console.log('tttttttttttttttttttttt');
  });
});
