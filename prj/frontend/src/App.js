import React from 'react'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

import HomePage from './components/homepage'
import RegisterPage from './components/register'
import LoginPage from './components/login'
import Dashboard from './components/dashboard'
import Navbar from './components/navbar'


function App() {
  return (
      <Router>
        <AuthProvider>
      <Navbar /> 
      <Switch>
        <PrivateRoute component={Dashboard} path="/dashboard" exact />
        <Route component={LoginPage} path="/login" />
        <Route component={RegisterPage} path="/register" />
        <Route component={HomePage} path="/" />
      </Switch>
        </AuthProvider>
      </Router>
  )
}

export default App

