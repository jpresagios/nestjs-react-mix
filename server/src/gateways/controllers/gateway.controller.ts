import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { GateWayRequest } from '../requests/gateway-request';
import { GatewayRepositoryService } from '../services/gateway-repository/gateway-repository.service';

@Controller('gateway')
export class GatewayController {
  constructor(private readonly gateWayRepository: GatewayRepositoryService) {}

  @ApiBody({
    type: GateWayRequest,
    description: 'Body contains gateway fields',
  })
  @ApiResponse({
    status: 201,
    type: GateWayRequest,
    description: 'Return the new gateway created',
  })
  @Post()
  async create(@Body() req: GateWayRequest, @Res() res) {
    try {
      const result = await this.gateWayRepository.insert(req);
      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: GateWayRequest,
    description: 'Return array of gateways',
  })
  @Get()
  async findAll(_, @Res() res) {
    try {
      const result = await this.gateWayRepository.findAll();
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @ApiResponse({
    status: 200,
    type: GateWayRequest,
    description: 'Return the detail gateway with the devices',
  })
  @Get('/:id')
  async detail(@Param('id') id, @Res() res) {
    try {
      const result = await this.gateWayRepository.findById(id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
