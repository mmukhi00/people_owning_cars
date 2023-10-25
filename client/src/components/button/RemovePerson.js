
import {DeleteOutlined} from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_PEOPLE, REMOVE_PERSON } from '../graphql/PersonQueries'
import {filter} from 'lodash'
const RemovePerson = ({id}) => {
    const [removePerson] = useMutation(REMOVE_PERSON, {
        update(cache, { data: { removePerson } }) {
            const { people } = cache.readQuery({ query: GET_PEOPLE })
            cache.writeQuery({
                query: GET_PEOPLE,
                data: {
                    people:filter(people,person=>person.id!==removePerson.id)
                }
                
            })
         }
     })
    const handelClickEvent = () => {
        const result = window.confirm("Are you sure you want to delete")
        if (result)
        {
            removePerson({
                variables: {
                    id
                }
            })
       }
            
    }
     return <DeleteOutlined key='delete' style={{color:'red'}} onClick={handelClickEvent} />
}
export default RemovePerson