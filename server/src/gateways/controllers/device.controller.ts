import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { DeviceRequest } from '../requests/device-request';
import { DeviceRepositoryService } from '../services/device-repository/device-repository.service';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceRepository: DeviceRepositoryService) {}

  @ApiBody({
    type: DeviceRequest,
    description: 'Body contains devices fields',
  })
  @ApiResponse({
    status: 201,
    isArray: true,
    type: DeviceRequest,
    description: 'Return the new device created',
  })
  @Post()
  async addDevice(@Body() req: DeviceRequest, @Res() res) {
    try {
      const { idGateway, ...rest } = req;
      const result = await this.deviceRepository.addDevice(idGateway, rest);
      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @ApiResponse({
    status: 200,
    type: DeviceRequest,
    description: 'Return the device that was deleted',
  })
  @Delete('/:id')
  async removeDevice(@Param('id') id, @Res() res) {
    try {
      const result = await this.deviceRepository.removeDevice(id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
