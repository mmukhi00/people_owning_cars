import { useMutation,useQuery } from "@apollo/client"
import {Form,Input,Button,InputNumber,Select} from 'antd'
import { useEffect, useState } from "react"
import { UPDATE_CAR } from "../graphql/CarQueries"
import { GET_PEOPLE } from '../graphql/PersonQueries';
const { Option } = Select;
const UpdateCar = ({id,year,make,model,price,pId,onButtonClick}) => {
  
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const [personId,setPersonId]=useState(pId)
    const { loading, error, data } = useQuery(GET_PEOPLE)
    useEffect(()=> {
     forceUpdate({})
    }, [])
    const [updateCar] = useMutation(UPDATE_CAR)
    const items = data.people.map(p => ({ label: p.firstName, key: p.id }))
    if (loading) return 'Loading'
    if (error) return `Error! ${error.message}`
       
    const handleMenuClick = (value) => {
      setPersonId(value)
    };
    const onFinish = values => {
      
        const { year, make, model, price } = values
        console.log("id:" + id)
        console.log("year:" + year)
        console.log("make:" + make)
        console.log("model:" + model)
        console.log("personId:" + personId)
        updateCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId
            }
        })
      form.resetFields()
      onButtonClick()
    }
    return (

        <Form
            form={form}
            name='update-contact-form'
            layout='inline'
            initialValues={{ year,make,model,price}}
            onFinish={onFinish}
        >
      <Form.Item name="year" label="Year" rules={[{required:true, message:'Please enter year'}]}>
        <InputNumber/>    
        </Form.Item>

         <Form.Item name="make" label="Make" rules={[{required:true, message:'Please enter make'}]}>
        <Input/>   
        </Form.Item>

        <Form.Item name="model" label="Model" rules={[{required:true, message:'Please enter model'}]}>
        <Input/>   
        </Form.Item>  

        <Form.Item name="price" label="Price" rules={[{required:true, message:'Please enter price'}]}>
         <InputNumber  placeholder='$' />  
        </Form.Item>   
    
       <Form.Item
        name="person"
        label="Person"
        
      >
        <Select
          placeholder="Select Person"
          onChange={handleMenuClick}
          allowClear
                >
                {items.map(item => (
                 <Option value={item.key}>{item.label}</Option>
            ))}
        </Select>
      </Form.Item>




        <Form.Item shouldUpdate={true}>
        {
        () => (
        <Button
            type='primary'
            htmlType='submit'
            disabled={
            (
            !form.isFieldTouched('year') && !form.isFieldTouched('model')
             && !form.isFieldTouched('make') && !form.isFieldTouched('price')
            && !form.isFieldTouched('person')
            )
            ||  form.getFieldsError()
           .filter(({ errors }) => errors.length).length
            }
            >
            Update Car
            </Button>
                )
           } 
        </Form.Item>
     <Button onClick={onButtonClick}>Cancel</Button>
    </Form>
    )
}
 
export default UpdateCar