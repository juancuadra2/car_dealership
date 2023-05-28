import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  getAll(): Car[] {
    return this.carsService.findAll();
  }
  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Car {
    return this.carsService.findById(id);
  }
  @Post()
  create(@Body() car: CreateCarDto) {
    return this.carsService.create(car);
  }
  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() car: UpdateCarDto,
  ): Car {
    return this.carsService.update(id, car);
  }
  @Delete('/:id')
  delete(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    this.carsService.delete(id);
    return res.status(HttpStatus.OK).send({
      message: 'Car deleted successful.',
    });
  }
}
