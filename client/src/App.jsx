import { useState } from 'react'
import './App.css'
import {Container} from 'react-bootstrap'
import { ContextProvider } from './context/ContextProvider'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <Container fluid>
     <ContextProvider>
        <AppRoutes/>
     </ContextProvider>
    </Container>
  )
}

export default App
