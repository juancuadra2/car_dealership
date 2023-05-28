import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [];
  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name,
      createdAt: new Date().getTime(),
    };
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand: Brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found.`);
    }
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandFound = this.findOne(id);
    this.brands = this.brands.map((brand: Brand) => {
      if (brand.id === id) {
        brandFound = {
          ...brandFound,
          ...updateBrandDto,
          id,
        };
        return brandFound;
      }
      return brand;
    });
    return brandFound;
  }

  remove(id: string) {
    const brandFound = this.findOne(id);
    this.brands = this.brands.filter((brand: Brand) => brand.id !== id);
    return brandFound;
  }
}
