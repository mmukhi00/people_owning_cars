import {gql} from '@apollo/client'
export const GET_PEOPLE = gql`
{
    people{
        id
        firstName
        lastName
    }
}`

export const GET_PERSON = gql`
query Query($id: String!) {
  person(id: $id) {
    id
    firstName
    lastName
  }
}

`
export const ADD_PERSON = gql`
mutation AddPerson($id:String!,$firstName:String!,$lastName:String!){
    addPerson(id:$id,firstName:$firstName,lastName:$lastName)
    {
        id
        firstName
        lastName

    }
}
`
export const REMOVE_PERSON = gql`
mutation Mutation($id: String!) {
  removePerson(id: $id) {
    id
    firstName
    lastName
  }
}
`
export const UPDATE_PERSON = gql`
mutation Mutation($id: String!, $firstName: String!, $lastName: String!) {
  updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
    id
    firstName
    lastName
  }
}
`

export const GET_CARS_BY_ID=gql`query PersonWithCar($id: String!) {
  personWithCar(personId: $id) {
    id
    year
    make
    model
    price
    personId
  }
}`