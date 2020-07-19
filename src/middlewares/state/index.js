import typeDefs from './schemas';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers';
import LaunchAPI from './dataSources/integrations/spacexdata';
import UserAPI from './dataSources/db/user';
import { db } from '../../db/config';
const models = db.models;
// console.log(models.user);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    engine: {
        reportSchema: true
    },
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ models })
    }),
    context: async ({ req }) => ({
        user: req.user
        , trans: req.t
    }),
    playground: {
        settings: {
            'request.credentials': 'same-origin',
        },
    },
});
const middleware = app => server.applyMiddleware({ app });
export default middleware
