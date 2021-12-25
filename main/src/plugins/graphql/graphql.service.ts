import { MainService } from '@plugins/main/main.service';
import { ProductDto } from '@model/dto/product.dto';
import { CreateProductDto } from '@model/dto/create-product.dto';

export class GraphqlService {
    constructor(private mainService: MainService) {}

    async getProductsByName(name: string): Promise<ProductDto[]> {
        const query = { name: { like: name } };
        const { products } = await this.mainService.getProductsByQuery(query);
        return products;
    }

    async createProduct(dto: CreateProductDto): Promise<ProductDto> {
        return this.mainService.createProduct(dto);
    }
}
