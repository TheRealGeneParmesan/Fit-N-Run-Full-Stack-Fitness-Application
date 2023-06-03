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

type Query {
  me: User
  donationSession: String
  nutritionAPI(query: String!): [Food]
}

type Food {
  foods: [Nutrition]
}

type Nutrition {
  food_name: String
  brand_name: String
  serving_qty: Int
  serving_unit: String
  serving_weight_grams: Int
  nf_calories: Int
  nf_total_fat: Int
  nf_saturated_fat: Int
  nf_cholesterol: Int
  nf_sodium: Int
  nf_total_carbohydrate: Int
  nf_dietary_fiber: Int
  nf_sugars: Int
  nf_protein: Int
  nf_potassium: Int
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






