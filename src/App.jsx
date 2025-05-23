import './App.css'
import Palette from './components/Palette/Palette.jsx'
import seedColors from './utilities/seedColors.js'
import {generatePalette} from './utilities/colorHelpers.js'

function App() {
  
  console.log(generatePalette(seedColors[1]))
  return (
    <main>
      <Palette {...seedColors[1]}/>
    </main>
  )
}

export default App
