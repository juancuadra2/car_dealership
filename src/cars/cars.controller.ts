import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from '../dtos/car.interface';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  getAll(): Car[] {
    return this.carsService.findAll();
  }
  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number): Car {
    return this.carsService.findById(id);
  }
  @Post()
  create(@Body() car: Car) {
    return this.carsService.create(car);
  }
  @Put('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() car: Car): Car {
    return this.carsService.update(id, car);
  }
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id, @Res() res) {
    this.carsService.delete(id);
    return res.status(HttpStatus.OK).send({
      message: 'Car deleted successful.',
    });
  }
}
