import { useState } from 'react'
import RoutesApp from './routes'
import { AuthProvider } from './contexts/auth'
import './App.css'

import Singin from '../pages/Singin'

function App() {
  
  return (
    <AuthProvider>
      <div>
     <RoutesApp />
        
      </div>
     
    </AuthProvider>
  )
}

export default App;


