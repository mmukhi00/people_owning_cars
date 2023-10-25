import { Card } from "antd"
import RemoveCar from "../button/RemoveCar"
import UpdateCar from "../button/UpdateCar"
import { useState } from "react"
import { EditOutlined } from "@ant-design/icons"

const CarCards = ({ price, year, model, id, personId, make }) => {
    const styles = getStyle()
    const [editMode, setEditMode] = useState(false)
       const handleEditButton= () => {
    setEditMode(!editMode)
}
    return (
        <div>
            {
                editMode ? (<UpdateCar price={price} year={year} model={model}
                    id={id} pId={personId} make={make} onButtonClick={handleEditButton} />)
                    : (<Card
            title={`${year} ${model}-> $ ${price}`}
            style={styles.card}
            actions={
            [<EditOutlined key='edit' onClick={handleEditButton} />,
            <RemoveCar id={id} />]}>
            </Card>)
            }
       
        </div>
    )
}

const getStyle = () => ({
    card: {

    }
})

export default CarCards