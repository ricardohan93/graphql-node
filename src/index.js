const { GraphQLServer } = require("graphql-yoga");

// "typeDefs" define meu GraphQL schema
const typeDefs = `
type Query {
  info: String!
}
`;

// é a implementação do GraphQL schema
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`
  }
};

// schema e resolvers são passados ao "GraphQLServer". Diz ao server quais API operations são aceitas
// e como elas devem ser resolvidas
const server = new GraphQLServer({
  typeDefs,
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
