import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Flex, VStack } from "@chakra-ui/layout"

import Nav from './components/common/Nav'
import Login from './components/auth/Login'
import ItemIndex from './components/items/ItemIndex'
import InventoryItemIndex from './components/items/InventoryItemIndex'

function App() {
  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/items') // * <-- replace with your endpoint
      const data = await res.json()
      console.log(data)
    }
    getData()
  })
  return (
    <VStack p={5}>
      <Flex w="100%">
        <Router>
          <Nav />
          <Switch>
            <Route path='/items' component={ItemIndex} />
            <Route path='/login' component={Login} />
            <Route path='/inventoryitems' component={InventoryItemIndex} />
          </Switch>
        </Router>
      </Flex>
    </VStack>
  )
}

export default App

{/* <Heading 
          ml="8"
          size="md"
          fontWeight='semibild'
        >

        </Heading> */}