import './App.css'
import Palette from './components/Palette/Palette.jsx'
import seedColors from './utilities/seedColors.js'
import {generatePalette} from './utilities/colorHelpers.js'
import {Route, Routes, Navigate} from 'react-router-dom'

function App() {
      
  return (
    <Routes>
      <Route exact path="/" element={<h1>Palette list goes here</h1>}/>
      <Route exact path="/palette/:id" element={<h1>Individual palette</h1>}/>

    </Routes>
    //<main>
   //  <Palette palette={generatePalette(seedColors[1])}/>
    //</main>
  )
}

export default App
