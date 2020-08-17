import { hot } from 'react-hot-loader'
import React from 'react'
import AppShell from './components/app-shell'
import Menue from './components/menu'
import './App.css'

const App = () => (
  <div className='App'>
    <AppShell someProps={{ giveMe: 'What Ever You Want!!!!' }} />
    <Menue someProps={{ anything: 'Else!' }} />
  </div>
)

export default hot(module)(App)
