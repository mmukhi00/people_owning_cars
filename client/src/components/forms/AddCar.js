import { useEffect, useState } from 'react'
import {Form,Input,Button,Select, InputNumber} from 'antd'
import {v4 as uuidv4} from 'uuid'
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CAR, GET_CARS } from '../graphql/CarQueries';
import { GET_PEOPLE } from '../graphql/PersonQueries';
const { Option } = Select;
const AddCar = () => {
  const [id] = useState(uuidv4())
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [addCar] = useMutation(ADD_CAR)
  const { loading, error, data } = useQuery(GET_PEOPLE)
  const [personId, setPersonId] = useState("")

  useEffect(() => {
    forceUpdate({})
  }, [])
  if (loading) return 'Loading'
  if (error) return `Error! ${error.message}`
  const items = data.people.map(p => ({ label: p.firstName, key: p.id }))
   
       
  const handleMenuClick = (value) => {
    setPersonId(value)
  };
   
  const onFinish = values => {
    const { price, year, model, make } = values
    addCar({
      variables: {
        id,
        year,
        price,
        model,
        make,
        personId
        
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS })
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar]
          }
        })
      }
      
    })
    form.resetFields()
  }
  return (
  <>
    { data.people.length>0&&
    <Form
      name='add-car-form'
      layout='inline'
      size='large'
      form={form}
      style={{ marginTop: '20px' }}
      onFinish={onFinish}
    >
      <Form.Item name="year" label="Year" rules={[{ required: true, message: 'Please enter year' }]}>
        <InputNumber />
      </Form.Item>

      <Form.Item name="make" label="Make" rules={[{ required: true, message: 'Please enter make' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="model" label="Model" rules={[{ required: true, message: 'Please enter model' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter price' }]}>
        <InputNumber placeholder='$' />
      </Form.Item>

      <Form.Item
        name="person"
        label="Person"
      >
        <Select
          placeholder="Select Car"
          onChange={handleMenuClick}
          allowClear
        >
          {items.map(item => (
            <Option value={item.key}>{item.label}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button type='primary' htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError()
                .filter(({ errors }) => errors.length).length
            }
          >Add Car</Button>
        )}
      </Form.Item>
    </Form>}
  </>
    )
}

export default AddCar