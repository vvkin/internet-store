import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import mercurius from 'mercurius';

import { GraphqlService } from '@plugins/graphql/graphql.service';
import { makeGraphqlResolvers } from '@plugins/graphql/graphql.resolver';
import { graphqlSchema } from '@plugins/graphql/graphql.schema';

const graphql: FastifyPluginAsync = async (fastify) => {
    const { mainService } = fastify;

    const graphqlService = new GraphqlService(mainService);
    const graphqlResolver = makeGraphqlResolvers(graphqlService);

    fastify.log.info(graphqlSchema);

    fastify.register(mercurius, {
        schema: graphqlSchema,
        resolvers: graphqlResolver,
    });
};

export default fp(graphql, { name: 'graphql', dependencies: ['main'] });
