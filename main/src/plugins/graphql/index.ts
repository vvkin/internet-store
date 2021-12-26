import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import mercurius from 'mercurius';

import { makeGraphqlResolvers } from '@plugins/graphql/graphql.resolver';
import { graphqlSchema } from '@plugins/graphql/graphql.schema';

const graphql: FastifyPluginAsync = async (fastify) => {
    const { mainService } = fastify;
    const graphqlResolver = makeGraphqlResolvers(mainService);

    fastify.register(mercurius, {
        schema: graphqlSchema,
        resolvers: graphqlResolver,
    });
};

export default fp(graphql, { name: 'graphql', dependencies: ['main'] });
