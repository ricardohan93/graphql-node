const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

// serve para gerar novos id's aos Link elements criados
let idCount = links.length;
// é a implementação do GraphQL schema
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links
  },
  Mutation: {
    post: (root, args) => {
      // cria um novo link object, coloca no "links" list e retorna link
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    }
  }
  // não precisa mais pois o GraphQL server já sabe como o Link é
  // Link: {
  //   id: root => root.id,
  //   description: root => root.description,
  //   url: root => root.url
  // }
};

// schema e resolvers são passados ao "GraphQLServer". Diz ao server quais API operations são aceitas
// e como elas devem ser resolvidas
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
