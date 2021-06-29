import React from 'react'
import { useHistory } from 'react-router'
import { login } from '../lib/api'
import { setToken } from '../lib/auth'
import { useForm } from '../hooks/useForm'
// import { ThemeProvider, CSSReset } from '@chakra-ui/core'
// import { Stack, Button, FormControl, FormLabel, InputGroup, InputRightElement, } from '@chakra-ui/core'

function Login() {
  const history = useHistory()
  const [isError, setIsError] = React.useState(false)
  const { formdata, handleChange } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await login(formdata)
      setToken(res.data.token)
      history.push('/items')
    } catch (err) {
      setIsError(true)
    }
  }

  const handleFocus = () => {
    setIsError(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        placeholder="Email"
        name="email"
        onFocus={handleFocus}
        onChange={handleChange}
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        name="password"
        onFocus={handleFocus}
        onChange={handleChange}
      />
      {isError && <small>Your credentials are incorrect, please check and try again</small>}
      <button type="submit">Login</button>
    </form>
  )
}

export default Login

{/* <ThemeProvider>
  <CSSReset />
</ThemeProvider> */}