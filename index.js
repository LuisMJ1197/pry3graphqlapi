const graphql = require("graphql-yoga");
const { GraphQLSchema } = graphql;
const { resolvers } = require("./schema/resolvers");

const server = new graphql.GraphQLServer({
  typeDefs: `./schema/schema.graphql`,
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));