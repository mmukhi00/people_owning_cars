import { useQuery } from '@apollo/client'
import { List } from 'antd'
import { GET_CARS } from '../graphql/CarQueries'
import CarCards from '../listItems/CarCards'

const Car = ({person}) => {
    const styles=getStyles()
    const { loading, error, data } = useQuery(GET_CARS)
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`
    console.log('data', data)
    
    return (<List grid={{gutter:20,column:1}} style={styles.list}>
        {
            data.cars.map(({ id, price, year, personId, model,make }) => {
                console.log("person:"+personId)
                if (person == personId)
                    return (<List.Item key={id} >
                        <CarCards price={price} year={year} model={model} id={id} personId={personId} make={make} />
                      </List.Item> )
                }        
            )
       } 
    </List>)
}

export default Car

const getStyles = () => ({
    list: {
        width:'100%'
    }
})