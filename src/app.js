const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { verifyToken } = require('./utils/auth');

require('dotenv').config();

const app = express();

// Connect to DB
connectDB();

// Setup Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    verifyToken(req); // Add user to context if token is valid
    return { user: req.user };
  },
});

server.start().then(() => {
   server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
