import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { useParams,useLocation, Link } from 'react-router-dom'
import { Card,List } from "antd"

import { GET_CARS_BY_ID } from '../graphql/PersonQueries'

const ShowPage = () => {
  const param = useParams()
  const location=useLocation()
  const id = param.id
  const{firstName,lastName}=location.state
  const styles=getStyles()
  const {loading,error,data} = useQuery(GET_CARS_BY_ID, {
    variables: {
    id
    }
  }) 
  if(error) return `Error: ${error}`
  console.log("cars:::"+ JSON.stringify(data))
 
  return (
    <Card title={`${firstName} ${lastName}`}>
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data&&data.personWithCar.map(({year,model,price}) => (
        <Card style={ styles.subcard} title={`${year} ${model}-> $ ${price}`}>
        </Card>
      ))}         
      </List>
      <Link to="/">Go Back Home</Link>
    </Card>
  )
}

export default ShowPage
const getStyles = () => ({
    list: {
        width:'100%'
  },
  subcard: {
    margin:10
  }
})