import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [];
  findAll(): Car[] {
    return this.cars;
  }
  findById(id: string): Car {
    const car = this.cars.find((car: Car) => car.id === id);
    if (!car) {
      throw new NotFoundException('Car not found.');
    }
    return car;
  }
  create(createCarDto: CreateCarDto): Car {
    const car: Car = {
      id: uuid(),
      name: createCarDto.name,
    };
    this.cars.push(<Car>car);
    return car;
  }
  update(id: string, updateCarDto: UpdateCarDto): Car {
    let carFound = this.findById(id);
    this.cars = this.cars.map((car: Car) => {
      if (car.id === id) {
        carFound = {
          ...carFound,
          ...updateCarDto,
          id,
        };
        return carFound;
      }
      return car;
    });
    return carFound;
  }
  delete(id: string): Car {
    const car = this.findById(id);
    this.cars = this.cars.filter((car: Car) => car.id !== id);
    return car;
  }
}
