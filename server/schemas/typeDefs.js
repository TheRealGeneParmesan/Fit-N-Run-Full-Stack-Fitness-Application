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
  distance: Number
  duration: Number
  date: Date
  userId: 
}

type Strength {
  _id: ID
  name: String
  weight: Number
  sets: Number
  reps: Number
  date: Date
  userId:
}

type Auth {
  token: ID!
  user: User
}

input CardioInput {
  _id: ID
  name: String
  distance: Number
  duration: Number
  date: Date
}

input StrengthInput {
  _id: ID
  name: String
  weight: Number
  sets: Number
  reps: Number
  date: Date
}

type Query {
  me: User
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
   
    
  
  
   
   
