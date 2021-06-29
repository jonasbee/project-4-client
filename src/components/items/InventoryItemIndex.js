import React from 'react'
import { getAllInventoryItems } from '../lib/api'
import InventoryItemCard from './InventoryItemCard'

function InventoryItems() {
  const [inventoryItems, setInventoryItems] = React.useState([])
  const [filterValues, setFilterValues] = React.useState({
    searchValue: '',
    dateExpiry: null,
  })
  const [selectedInventoryItems, setSelectedInventoryItems] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        // ? getAllInventoryItems GET request from lib
        const { data } = await getAllInventoryItems()
        setInventoryItems(data)
        console.log(data)
        setSelectedInventoryItems(data)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [])

  React.useEffect(() => {
    const filterInventoryItems = () => {
      setSelectedInventoryItems(inventoryItems.filter(inventoryItem => {
        if (!filterValues.dateExpiry && inventoryItem.item.name.toLowerCase().includes(filterValues.searchValue.toLowerCase())) {
          return inventoryItem
        } else if (filterValues.searchValue === '' && filterValues.dateExpiry && (((inventoryItem.expiryDate.slice(0, 10)) < filterValues.dateExpiry) || (inventoryItem.expiryDate.slice(0, 10) === filterValues.dateExpiry))) {
          return inventoryItem
        } else if (
          filterValues.searchValue !== '' &&
          filterValues.dateExpiry &&
          (((inventoryItem.expiryDate.slice(0, 10)) < filterValues.dateExpiry) ||
            (inventoryItem.expiryDate.slice(0, 10) === filterValues.dateExpiry)) &&
          inventoryItem.item.name.toLowerCase().includes(filterValues.searchValue.toLowerCase())) {

          return inventoryItem
        }
      }))
    }
    filterInventoryItems()
  }, [filterValues, inventoryItems])

  const searchTyping = (e) => {
    setFilterValues({ ...filterValues, searchValue: e.target.value })
    console.log(e.target.value)
  }

  const dateSelected = (e) => {
    setFilterValues({ ...filterValues, dateExpiry: e.target.value })
    console.log(e.target.value)
  }

  return (
    <>
      <div>
        <label className="label">Search Item:</label>
        <input type="search" placeholder="e.g. tomato" onKeyUp={searchTyping} />
        <label className="label">Expiry Date:</label>
        <input
          className="input"
          id="expiryDate"
          type="date"
          name="expiryDate"
          min={`${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + (new Date().getDate())).slice(-2)}`}
          onChange={dateSelected}
        />
      </div>
      <div>
        {selectedInventoryItems ? (
          selectedInventoryItems.map(item => (
            <InventoryItemCard
              key={item.id}
              name={item.item.name}
              category={item.item.category}
              icon={item.item.icon}
              id={item.id}
              quantityNumber={item.quantityNumber}
              metric={item.metric}
              expiryDate={item.expiryDate}
              item_id={item.itemId}
            />
          ))
        ) : (
          <p>...Loading</p>
        )}
      </div>
    </>
  )
}

export default InventoryItems