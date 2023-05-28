import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from '../dtos/car.interface';

@Injectable()
export class CarsService {
  private cars: Car[] = [];
  findAll(): Car[] {
    return this.cars;
  }
  findById(id: number): Car {
    const car = this.cars.find((car: Car) => car.id === id);
    if (!car) {
      throw new NotFoundException('Car not found.');
    }
    return car;
  }
  create(car: Car): Car {
    this.cars.push(car);
    return car;
  }
  update(id: number, car: Car): Car {
    const index = this.cars.findIndex((car: Car) => car.id === id);
    this.cars[index] = car;
    const updatedCar = this.cars[index];
    if (!updatedCar) {
      throw new NotFoundException('Car not found.');
    }
    return updatedCar;
  }
  delete(id: number): Car[] {
    const index = this.cars.findIndex((car: Car) => car.id === id);
    const deletedCar = this.cars.splice(index, 1);
    if (deletedCar.length <= 0) {
      throw new NotFoundException('Car not found.');
    }
    return deletedCar;
  }
}
