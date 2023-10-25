import { gql } from '@apollo/client'
export const GET_CARS = gql`
{
  cars {
    year
    price
    personId
    model
    make
    id
  }
}
`

export const ADD_CAR = gql`
mutation Mutation($id: String!, $year: Int, $make: String, $model: String, $price: Float, $personId: String) {
  addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) 
     {
        year
        price
        model
        make
        id
        personId
    } 
}

`

export const REMOVE_CAR = gql`
mutation Mutation($id: String!) {
  removeCar(id: $id) {
    id
    year
    make
    model
    price
    personId
  }
}
`

export const UPDATE_CAR = gql`
mutation Mutation($id: String!, $year: Int, $make: String, $model: String, $price: Float, $personId: String) {
  updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
    id
    year
    make
    model
    price
    personId
  }
}
`