import { GraphqlService } from '@plugins/graphql/graphql.service';
import { ProductDto } from '@model/dto/product.dto';
import { CreateProductDto } from '@model/dto/create-product.dto';

export const makeGraphqlResolvers = (graphqlService: GraphqlService) => ({
    Query: {
        search: async (
            _: unknown,
            context: { name: string }
        ): Promise<ProductDto[]> => {
            const { name } = context;
            return graphqlService.getProductsByName(name);
        },
    },
    Mutation: {
        createProduct: async (
            _: unknown,
            context: { data: CreateProductDto }
        ): Promise<ProductDto> => {
            const { data } = context;
            return graphqlService.createProduct(data);
        },
    },
});
