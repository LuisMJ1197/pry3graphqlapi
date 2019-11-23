const express  = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./schema/resolvers');
const schema = require('./schema/schema');

const app = express();
app.use("/", bodyParser.json({limit: '50mb'}));
const server = new ApolloServer({ typeDefs: schema.schema, resolvers: resolvers.resolvers });
server.applyMiddleware({ app, path: '/'});
// bodyParser is needed just for POST.

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);