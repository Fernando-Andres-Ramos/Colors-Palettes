import './App.css'
import Palette from './components/Palette/Palette.jsx'
import PaletteList from './components/PaletteList/PaletteList.jsx'
import SingleColorPalette from './components/SingleColorPalette/SingleColorPalette.jsx'
import seedColors from './utilities/seedColors.js'
import {generatePalette} from './utilities/colorHelpers.js'
import {Route, Routes, Navigate, useLocation} from 'react-router-dom'

function App() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/")
  const id = pathSegments[2] || "flat-ui-colors-french"; 
  

  function findPalette(idToFind){
    return seedColors.find(function(palette){
      return palette.id === idToFind
    })
  }; 

  return (
    <Routes>
      <Route exact path="/" element={<PaletteList palettes={seedColors}/>}/>
      <Route 
        exact path="/palette/:id" 
        element={<Palette 
                    palette={generatePalette(
                      findPalette(id)
                    )}/>
                }
      />
      <Route exact path="/palette/:id/:colorId" element={<SingleColorPalette/>} />
      <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
  )
}

export default App
