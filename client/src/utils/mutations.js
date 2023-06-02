import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CARDIO = gql`
  mutation saveCardio($input: CardioInput!) {
    saveCardio(input: $input) {
      _id
      name
      distance
      duration
      date
    }
  }
`;

export const ADD_STRENGTH = gql`
  mutation saveStrength($input: StrengthInput!) {
    saveStrength(input: $input) {
      _id
        name
        weight
        sets
        reps
        date
    }
  }
`;

export const REMOVE_CARDIO = gql`
  mutation removeCardio($cardioId: ID!) {
    removeCardio(cardioId: $cardioId) {
      _id
      name
      distance
      duration
      date
    }
  }
`;


export const REMOVE_STRENGTH = gql`
  mutation removeStrength($strengthId: ID!) {
    removeStrength(strengthId: $strengthId) {
        _id
        name
        weight
        sets
        reps
        date
      }
    }
`;
