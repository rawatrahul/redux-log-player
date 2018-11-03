import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import models from './models'
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';


const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 8080;
const app = express();
const graphqlEndpoint = '/graphql';

// Middleware: GraphQL
app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({ 
  schema,
  context: {
    models,
    user:{
      id:1
    },
  } 
}));

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync({}).then(() => {
  app.listen(PORT);
});