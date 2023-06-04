import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
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


export const GET_EXERCISES = gql`
  query exercisesByMuscle($muscle: String!) {
    getExercises(muscle: $muscle) {
      name
      type
      muscle
      equipment
      difficulty
      instructions
    }
  }
`;