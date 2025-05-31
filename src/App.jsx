import './App.css'
import Palette from './components/Palette/Palette.jsx'
import PaletteList from './components/PaletteList/PaletteList.jsx'
import SingleColorPalette from './components/SingleColorPalette/SingleColorPalette.jsx'
import NewPaletteForm from './components/NewPaletteForm/NewPaletteForm.jsx'
import seedColors from './utilities/seedColors.js'
import {generatePalette} from './utilities/colorHelpers.js'
import {Route, Routes, Navigate, useLocation} from 'react-router-dom'
import React from 'react'

function App() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/")
  const paletteId = pathSegments[2] || "";
  const colorId = pathSegments[3] || "";
  const [palettes, setPalettes] = React.useState(seedColors)
  


  function findPalette(idToFind){
    return palettes.find(palette => palette.id === idToFind)
  }

  function savePalette(paletteToSave){
    setPalettes([...palettes,paletteToSave])
  }
  
  return (
    <Routes>
      <Route exact path="/" element={<PaletteList palettes={palettes}/>}/>
      
      <Route 
        exact path="/palette/:paletteId" 
        element={findPalette(paletteId)
          ?<Palette palette={generatePalette(findPalette(paletteId))}/>
          :<Navigate to="/"/>}
      />
      
      <Route 
        exact path="/palette/:paletteId/:colorId" 
        element={findPalette(paletteId)
          ?<SingleColorPalette 
              colorId={colorId} 
              palette={generatePalette(findPalette(paletteId))}/>
          :<Navigate to="/"/>} 
        />

      <Route 
        exact path="/palette/new" 
        element={
          <NewPaletteForm 
            savePalette={savePalette} 
            palettes={palettes}/>
          }
      />  
      
      <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
  )
}

export default App
