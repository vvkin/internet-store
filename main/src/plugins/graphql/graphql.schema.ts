export const graphqlSchema = `
    type Query {
        search(name: String!): [Product!]!
        product(id: ID!): Product
        supplier(id: ID!): Supplier
        order(id: ID!): Order
    }
    
    type Mutation {
        createProduct(data: CreateProduct!): Product!
        deleteProduct(id: ID!): Product
        updateProduct(id: ID!, data: UpdateProduct!): Product!
        createSupplier(data: CreateSupplier!): Supplier!
        createOrder(data: CreateOrder!): Order!
    }
    
    type Product {
        id: ID!
        name: String!
        externalName: String!
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
        
    input UpdateProduct {
        supplierId: Int
        categoryId: Int
        name: String
        price: Float
        volume: Float
        degree: Int
        unitsInStock: Int
        discount: Float
        description: String
    }
    
    type Supplier {
        id: ID!
        countryId: Int!
        companyName: String!
        contactName: String!
        email: String!
    }
    
    input CreateSupplier {
        countryId: Int!
        companyName: String!
        contactName: String!
        email: String!
    }
    
    type Order {
        id: ID!
        deliveryMethodId: ID!
        products: [OrderDetails]!
        fullName: String!
        phone: String!
        address: String!
        requiredDate: String!
        createdAt: String!
        isConfirmed: Boolean!
        isPaid: Boolean!
    }
    
    type OrderDetails {
        id: Int!
        productId: Int!
        externalName: String!
        orderId: Int!
        quantity: Int!
    }
    
    input CreateOrderDetails {
        productId: Int!
        externalName: String!
        quantity: Int!
    }
    
    input CreateOrder {
        deliveryMethodId: ID!
        products: [CreateOrderDetails]!
        fullName: String!
        phone: String!
        address: String!
        requiredDate: String!
    }
`;
