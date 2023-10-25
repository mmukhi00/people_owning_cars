import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../graphql/PersonQueries'
import { List } from 'antd'
import PersonCard from '../listItems/PersonCard'


const Person = () => {
    const styles = getStyles()
        const { loading, error, data } = useQuery(GET_PEOPLE)

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`
    console.log('data', data)
    
    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {
            data.people.map(({ id, firstName, lastName }) => (
                <List.Item key={id} >
                    <PersonCard firstName={firstName} lastName={lastName} id={id} />   
            </List.Item>   
            ))
       } 
    </List>)
}

export default Person

const getStyles = () => ({
    list: {
        marginTop:30,
        width:'100%'
    }
})