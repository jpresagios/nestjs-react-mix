import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('GateWay service')
  .setDescription('APIs with abilities to handle gateways and devices')
  .setVersion('1.0.0')
  .setBasePath('/')
  .build();
