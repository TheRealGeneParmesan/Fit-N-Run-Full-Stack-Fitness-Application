const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID
  username: String
  email: String
  password: String
}

type Cardio {
  _id: ID
  name: String
  distance: Int
  duration: Int
  date: String
  userId: ID
}

type Strength {
  _id: ID
  name: String
  weight: Int
  sets: Int
  reps: Int
  date: String
  userId: ID
}

type Auth {
  token: ID!
  user: User
}

input CardioInput {
  _id: ID
  name: String
  distance: Int
  duration: Int
  date: String
}

input StrengthInput {
  _id: ID
  name: String
  weight: Int
  sets: Int
  reps: Int
  date: String
}

type Query {
  me: User
  donationSession: String
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveCardio(input: CardioInput): User
  saveStrength(input: StrengthInput): User
  removeCardio(cardioId: ID!): User
  removeStrength(strengthId: ID!): User
}

`;

module.exports = typeDefs;






