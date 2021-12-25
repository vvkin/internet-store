export const graphqlSchema = `
    type Query {
        search(name: String!): [Product]!
    }
    
    type Mutation {
        createProduct(data: CreateProduct!): Product!
    }
    
    type Product {
        id: ID!
        name: String!
        price: Float!
        description: String!
        category: String
        company: String
        volume: Float
        discount: Int
        degree: Float
        inStock: Int
    }
    
    input CreateProduct {
        supplierId: Int!
        categoryId: Int!
        name: String!
        price: Float!
        description: String!
        volume: Float!
        degree: Int!
        unitsInStock: Int!
        discount: Float!
    }
`;
