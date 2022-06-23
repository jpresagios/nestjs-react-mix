import { Module } from '@nestjs/common';
import { GatewaysModule } from './gateways/gateways.module';
import { MongooseModule } from '@nestjs/mongoose';
import env from './configs/env-config';

@Module({
  imports: [GatewaysModule, MongooseModule.forRoot(env.MONGODB_URI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
