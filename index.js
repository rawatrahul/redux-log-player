import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models'
import { makeExecutableSchema } from 'graphql-tools';


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

const PORT = 8080;
const app = express();
const graphqlEndpoint = '/graphql';

// Middleware: GraphQL
app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({schema}));

app.use('/graphiql', graphiqlExpress({ endpointURL : graphqlEndpoint}));

models.sequelize.sync({}).then(() => {
  app.listen(PORT);
});