const graphql = require("graphql-yoga");
const { GraphQLSchema } = graphql;
const { resolvers } = require("./schema/resolvers");
const localtunnel = require('localtunnel');
 
const server = new graphql.GraphQLServer({
  typeDefs: `./schema/schema.graphql`,
  resolvers,
});

tunnelFunc = (async () => {
  const tunnel = await localtunnel({port: 4000, subdomain: "bindin"});
  console.log("Localtunnel is on. URL: " + tunnel.url);
});

server.start(() => {
  console.log(`Server is running on http://localhost:4000`);
  //tunnelFunc();
  //console.log("All init.");
});

 
