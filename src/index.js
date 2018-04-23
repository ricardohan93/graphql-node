const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");

// é a implementação do GraphQL schema
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info);
    }
  },
  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink(
        {
          data: {
            url: args.url,
            description: args.description
          }
        },
        info
      );
    }
  }
};

// schema e resolvers são passados ao "GraphQLServer". Diz ao server quais API operations são aceitas
// e como elas devem ser resolvidas
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint:
        "https://us1.prisma.sh/public-dandelionhorse-789/hackernews-node/dev",
      secret: "mysecret123",
      debug: true
    })
  })
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
