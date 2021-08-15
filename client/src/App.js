import './App.css'
import React, { useState, useEffect } from 'react'
import Home from './components/Home'
import About from './components/About'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import SignUpPage from './components/SignUpPage'
import SignInPage from './components/SignInPage'
import Welcome from './components/Welcome'
import Dashboard from './components/Dashboard'
import DeletedAccount from './components/DeletedAccount'
import messageService from './services/messages'
import { Switch, Route } from 'react-router-dom'

const Main = ({ user, setUser }) => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About} />
      <Route exact path='/signup' component={SignUpPage} />
      <Route exact path='/signin' render={() => (
        <SignInPage setUser={setUser} />
      )} />
      <Route exact path = '/welcome' component={Welcome} />
      <Route exact path = '/dashboard' component={Dashboard} />
      <Route exact path = '/delete' render={() => (
        <DeletedAccount setUser={setUser} />
      )} />
    </Switch>
  )
}

const App = () => {
  const [ user, setUser ] = useState('')
  
  useEffect(() => {
    const testForExpiredUser = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedWWUser')
      if (loggedUserJSON) {
          const test = await messageService.getUserMessages()
          if (test !== null){ 
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            messageService.setToken(user.token)
          } else {
            window.localStorage.removeItem('loggedWWUser')
          }
      }
    }
    testForExpiredUser()
  }, [])
  
  return (
    <div>
      <Navigation user={user} />
      <Main user={user} setUser={(loggedUser) => setUser(loggedUser)} />
      <Footer />
    </div>
  )
}

export default App;
