import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js';
import { connectDB } from './database/connection.js';
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  csrfPrevention: false,
});

const startServer = async () => {
  await connectDB();
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
    context: async ({ req }) => ({
      headers: req.headers,
    }),
  });
  
  console.log(`🚀 GraphQL Server ready at: ${url}`);
  console.log(`📊 GraphQL Playground available at: ${url}`);
};

startServer().catch((error) => {
  console.error('Server startup error:', error);
  process.exit(1);
});