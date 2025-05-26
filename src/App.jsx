import './App.css'
import Palette from './components/Palette/Palette.jsx'
import seedColors from './utilities/seedColors.js'
import {generatePalette} from './utilities/colorHelpers.js'
import {Route, Routes, Navigate, useLocation} from 'react-router-dom'

function App() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/")
  const id = pathSegments[2]; 

  function findPalette(idToFind){
    return seedColors.find(function(palette){
      return palette.id === idToFind
    })
  }; 

  return (
    <Routes>
      <Route exact path="/" element={<h1>Palette list goes here</h1>}/>
       <Route 
        exact path="/palette/:id" 
        element={<Palette 
                    palette={generatePalette(
                      findPalette(id)
                    )}/>
                }
      /> 
    </Routes>
  )
}

export default App
