import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Home from './pages/Home'
import View from './pages/View'
import Nav from './comp/Nav'
import Login from './pages/Login'


function App() {


  return (
    <>

  
      <Router>
      <Nav></Nav>

        <Routes>
          
            <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/view/:id' element={<View />} />
          <Route path='/edit/:id' element={<Edit />} />
              
          
        
        </Routes>
      </Router>
     
    </>
  )
}

export default App
