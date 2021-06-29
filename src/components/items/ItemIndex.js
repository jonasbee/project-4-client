import React from 'react'
import { useLocation } from 'react-router-dom'
import { getAllItems } from '../lib/api'
import ItemCard from './ItemCard'

function ItemIndex() {

  const location = useLocation()
  const [items, setItems] = React.useState([])
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllItems()
        setItems(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  React.useEffect(() => {
    setIsOpen(!isOpen)
  }, [location.pathname])

  return (
    <section>
      <div>
        {items ? (
          items.map(item => (
            <ItemCard 
              key={item.id}
              name={item.name}
              category={item.category}
              icon={item.icon}
              id={item.id}
            />
          ))
        ) : (
          <p>Loading ...</p>
        )
        }
      </div>
    </section>
  )
}

export default ItemIndex