import React,{useEffect} from 'react'
import {Route, Routes, Navigate, useLocation} from 'react-router-dom'
import './App.css' 
import Palette from './components/Palette/Palette.jsx'
import PaletteList from './components/PaletteList/PaletteList.jsx'
import SingleColorPalette from './components/SingleColorPalette/SingleColorPalette.jsx'
import NewPaletteForm from './components/NewPaletteForm/NewPaletteForm.jsx'
import MotionDiv from './components/MotionDiv/MotionDiv.jsx'

import { AnimatePresence } from 'framer-motion';
import seedColors from './utilities/seedColors.js'
import {generatePalette} from './utilities/colorHelpers.js'

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
  const location = useLocation();
  const pathSegments = location.pathname.split("/")
  const paletteId = pathSegments[2] || "";
  const colorId = pathSegments[3] || "";
  const [palettes, setPalettes] = React.useState(savedPalettes||seedColors)

  function resetDefaultPalettes(){
    setPalettes(seedColors)
  }

  function findPalette(idToFind){
    return palettes.find(palette => palette.id === idToFind)
  }

  function deletePalette(idToRemove){
    const updatedPalettes = palettes.filter(palette=>palette.id!==idToRemove)
    setPalettes(updatedPalettes)
  }

  function savePalette(paletteToSave){
    setPalettes([...palettes,paletteToSave])
  }
  
  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);
  
  return (
    <AnimatePresence mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route 
          exact path="/" 
          element={
            <MotionDiv>
              <PaletteList 
              palettes={palettes} 
              deletePalette={deletePalette}
              resetDefaultPalettes={resetDefaultPalettes}
              />
            </MotionDiv>
          }
        />
        
        <Route 
          exact path="/palette/:paletteId" 
          element={findPalette(paletteId)
            ?<MotionDiv>
                <Palette palette={generatePalette(findPalette(paletteId))}/>
              </MotionDiv>
            :<MotionDiv>
              <Navigate to="/"/>
             </MotionDiv>}
        />
        
        <Route 
          exact path="/palette/:paletteId/:colorId" 
          element={findPalette(paletteId)
            ?<MotionDiv>
                <SingleColorPalette 
                  colorId={colorId} 
                  palette={generatePalette(findPalette(paletteId))}/>
              </MotionDiv>
            :<MotionDiv>
              <Navigate to="/"/>
             </MotionDiv>} 
          />

        <Route 
          exact path="/palette/new" 
          element={
            <MotionDiv>
              <NewPaletteForm 
              savePalette={savePalette} 
              palettes={palettes}/>
            </MotionDiv>
            }
        />  
        
        <Route path="*" element={<MotionDiv><Navigate to="/"/></MotionDiv>} />
      </Routes>


    </AnimatePresence>
  )
}

export default App
