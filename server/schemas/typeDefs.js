const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID
  username: String
  email: String
  password: String
  cardio: [Cardio]
  strength: [Strength]
}

type Cardio {
  _id: ID
  name: String
  distance: Int
  duration: Int
  date: String
}

type Strength {
  _id: ID
  name: String
  weight: Int
  sets: Int
  reps: Int
  date: String
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



type Exercise {
  name: String!
  type: String!
  muscle: String!
  equipment: String!
  difficulty: String!
  instructions: String!
}


type Query {
  getExercises(muscle: String!): [Exercise]
  me: User
  donationSession: String
}


type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveCardio(input: CardioInput): Cardio
  saveStrength(input: StrengthInput): Strength
  removeCardio(cardioId: ID!): Cardio
  removeStrength(strengthId: ID!): Strength
}

`;

module.exports = typeDefs;






