import React from 'react'
// import { useHistory } from 'react-router'
import { createInventoryItem } from '../lib/api'
import { isAuthenticated } from '../lib/auth'
import { useForm } from '../hooks/useForm'

function ItemCard({ name, category, icon, id }) {

  // setFormErrors, formErrors
  const { formdata, handleChange } = useForm({
    quantityNumber: '',
    metric: '',
    expiryDate: '',
    item: `${id}`,
  })
  const [isAddClicked, setIsAddClicked] = React.useState(false)
  const isLoggedIn = isAuthenticated()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(id)
      console.log(formdata)
      const newItem = await createInventoryItem(id, formdata)
      console.log(newItem)
      // history.push('/inventoryitems')
      // ? set to true everytime clicked
      setIsAddClicked(true)
      setTimeout(() => setIsAddClicked(false), 300)

      console.log('after mount', isAddClicked)
    } catch (err) {
      // ! Set to BE api errors
      console.log('BE Errors: ', err.response.data.message)
      // setFormErrors(err.response.data.errors)
    }
  }

  return (
    <div
      id={isAddClicked ? 'zoom-in' : ''}
    >
      <figure>
        <img src={icon} alt={name} />
      </figure>
      <div>
        <p>Name: <span>{name}</span></p>
        <p>Category: <span>{category}</span></p>
        {isLoggedIn &&
          <form onSubmit={handleSubmit}>
            <label>Quantity:</label>
            <input
              // className ={`input ${formErrors.quantity ? 'is-danger' : ''}`}
              type="number"
              id="quantity"
              placeholder="e.g. 6"
              name="quantityNumber"
              onChange={handleChange}
            />
            {/* {formErrors.quantity && (
            <small className="help is-danger">Please enter valid quantity</small>
          )} */}
            <br />
            <label>Metric:</label>
            <input
              type="text"
              id="metric"
              placeholder="e.g. g"
              name="metric"
              onChange={handleChange}
            />
            <br />
            <label className="label">Expiry Date:</label>
            <input
              // className={`input mb-2 ${formErrors.expiryDate ? 'is-danger' : ''}`}
              id="expiryDate"
              type="date"
              name="expiryDate"
              min={`${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + (new Date().getDate())).slice(-2)}`}
              onChange={handleChange}
            />
            {/* {formErrors.expiryDate && (
            <small className="help is-danger">Please add an expiry date</small>
          )} */}
            <br />
            <button type="submit">Add</button>
          </form>
        }
      </div>
    </div>
  )

}

export default ItemCard