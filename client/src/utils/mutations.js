import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_CARDIO = gql`
    mutation addCardio($name: String!, $distance: Int!, $duration: Int!, $date: Date!){
        addCardio(name: $name, distance: $distance, duration: $duration, date: $date){
            _id
            username
            email
            cardio {
                _id
                name
                distance
                duration
                date
            }
        }
    }
`;

export const ADD_STRENGTH = gql`
    mutation addStrength($name: String!, $weight: Int!, $sets: Int!, $reps: Int!, $date: Date!){
        addStrength(name: $name, weight: $weight, sets: $sets, reps: $reps, date: $date){
            _id
            username
            email
            strength {
                _id
                name
                weight
                sets
                reps
                date
            }
        }
    }
`;

export const REMOVE_CARDIO = gql`
    mutation removeCardio($cardioId: ID!){
        removeCardio(cardioId: $cardioId){
            _id
            username
            email
            cardio {
                _id
                name
                distance
                duration
                date
            }
        }
    }
`;

export const REMOVE_STRENGTH = gql`
    mutation removeStrength($strengthId: ID!){
        removeStrength(strengthId: $strengthId){
            _id
            username
            email
            strength {
                _id
                name
                weight
                sets
                reps
                date
            }
        }
    }
`;