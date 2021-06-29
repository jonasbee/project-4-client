import React from 'react'
import { useHistory } from 'react-router'
import { deletePersonalisedItem, editPersonalisedItem } from '../lib/api'
import { useForm } from '../hooks/useForm'

function InventoryItemCard({ name, category, icon, id, quantityNumber, metric, expiryDate, itemId }) {

  console.log(quantityNumber)
  console.log(expiryDate)
  const history = useHistory()
  const handleDelete = async () => {
    try {
      await deletePersonalisedItem(id)
      history.go(0)
    } catch (err) {
      console.log(err)
    }
  }

  const [isButtonClicked, setEditButtonClicked] = React.useState(false)
  const [changedItem, setChangedItem] = React.useState(null)

  const { formdata, handleChange } = useForm({
    expiryDate: `${expiryDate}`,
    quantityNumber: `${quantityNumber}`,
    metric: `${metric}`,
    item: `${itemId}`,
  })

  // event => setChangedItem({
  //   'quantityNumber': `${event.target.value}`,
  // })

  const handleEdit = (e) => {
    try {
      setEditButtonClicked(!isButtonClicked)
      console.log(e.target.value)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSave = async () => {
    try {
      await editPersonalisedItem(id, formdata)
      console.log(formdata)
      history.go(0)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div>
        <figure>
          <img src={icon} alt={name} />
        </figure>
      </div>
      {!isButtonClicked ?
        <>
          <div>
            <p>Name: <span>{name}</span></p>
            <p>Category: <span>{category}</span></p>
            <p>Quantity: <span>{`${quantityNumber} ${metric}`}</span></p>
            <p>Expiry Date: <span>{new Date(expiryDate).toLocaleDateString()}</span></p>
          </div>
          <button
            type="submit"
            name='quantity'
            onClick={handleEdit}
          >
            Edit Quantity
          </button>
        </>
        :
        <>
          <div>
            <p>Name: <span>{name}</span></p>
            <p>Category: <span>{category}</span></p>
            <label htmlFor="quantity">Quantity: </label>
            <input 
              name="quantityNumber"
              type="number" id="quantityNumber"
              placeholder={quantityNumber}
              onChange={handleChange}
            />
            <p>Expiry Date: <span>{new Date(expiryDate).toLocaleDateString()}</span></p>
          </div>
          <button
            type="submit"
            name='quantity'
            onClick={handleSave}
          >
            Save Changes
          </button>
        </>
      }
      <div>
        <button
          type="submit"
          name='quantity'
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default InventoryItemCard