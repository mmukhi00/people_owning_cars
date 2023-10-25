import { DeleteOutlined } from "@ant-design/icons"
import { useMutation } from "@apollo/client"
import { GET_CARS, REMOVE_CAR } from "../graphql/CarQueries"
import {filter} from 'lodash'

const RemoveCar = ({id}) => {

    const [removeCar] = useMutation(REMOVE_CAR, {
        update(cache, { data: { removeCar } }) {
           const {cars}=cache.readQuery({query:GET_CARS})
            cache.writeQuery({
                query: GET_CARS,
                data: {
                   cars:filter(cars,car=>car.id!==removeCar.id) 
                }
           })
        }
    })
    const onHandelDelete = () => {
        const result=window.confirm("Are you sure you want to delete car")
        if (result) {
            removeCar({
                variables: {
                id
            }
        })
    }
    }
    
    return <DeleteOutlined key="delete" style={{ color:'red'}} onClick={onHandelDelete}/>
}
export default RemoveCar