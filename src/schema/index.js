const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String
    subjects: [String]
    attendance: Int
    role: String!
    password: String!
    email: String
  }

  type AuthPayload {
  token: String!
  user: Employee
}

  type Query {
    listEmployees(page: Int, limit: Int, sortBy: String, order: String): [Employee]
    getEmployee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(name: String!, age: Int!, class: String, subjects: [String], role: String!, email: String, password: String): Employee
    login(email: String!, password: String!): AuthPayload
    updateEmployee(id: ID!, name: String, age: Int, class: String, subjects: [String], attendance: Int): Employee
  }
`;

module.exports = typeDefs;
