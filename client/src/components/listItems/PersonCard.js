import { Card } from "antd"
import {useState } from "react"
import Car from "../lists/Car"
import RemovePerson from "../button/RemovePerson"
import { EditOutlined } from "@ant-design/icons"
import UpdatePerson from "../button/UpdatePerson"
import { Link } from "react-router-dom"
const PersonCard = ({firstName,lastName,id}) => {
    const [editMode,setEditMode]=useState(false)
    const handleEditButton= () => {
    setEditMode(!editMode)
}
    return (
    <div>
        {
                editMode ? (<UpdatePerson firstName={firstName } lastName={lastName} id={id} onButtonClick={handleEditButton} />) :
               ( <Card
                    title={`${firstName} ${lastName} `}
                    actions={[<EditOutlined key='edit' onClick={handleEditButton} />, <RemovePerson id={id} />]}>
                        <Car person={id} />
                        <Link to={`person/${id}`} state={{firstName, lastName}}>Learn More</Link>
                    </Card>)
               
            }
            
    </div>
    )
}

export default PersonCard