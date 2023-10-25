import { useMutation } from "@apollo/client"
import { Button, Form ,Input} from "antd"
import { useEffect, useState } from "react"
import { UPDATE_PERSON } from "../graphql/PersonQueries"

const UpdatePerson = ({id,firstName,lastName,onButtonClick}) => {
  
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    useEffect(()=> {
     forceUpdate({})
    }, [])
    const [updatePerson]=useMutation(UPDATE_PERSON)
    const onFinish = values => {
        const { firstName, lastName } = values
        updatePerson({
            variables: {
                id,
                firstName,
                lastName
            }
        })
       onButtonClick()
    }
    return (

        <Form
            form={form}
            name='update-contact-form'
            layout='inline'
            initialValues={{ firstName, lastName }}
            onFinish={onFinish}
        >
 <Form.Item name='firstName' label='First Name' rules={[{required:true, message:'Please enter a first name'}]}>
    <Input placeholder='i.e.Lily'/>     
         </Form.Item>
        
    <Form.Item name='lastName' label='Last Name' rules={[{required:true, message:'Please enter a last name'}]}>
     <Input placeholder='i.e.Smith'/>     
            </Form.Item>
        <Form.Item shouldUpdate={true}>
            {
                () => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            (!form.isFieldTouched('firstName')
                                && !form.isFieldTouched('lastName'))
                        ||  form.getFieldsError()
        .filter(({ errors }) => errors.length).length
                        }
                    >
                    Update Person
                    </Button>
                )
           } 
        </Form.Item>
     <Button onClick={onButtonClick}>Cancel</Button>
    </Form>
    )
}
 
export default UpdatePerson