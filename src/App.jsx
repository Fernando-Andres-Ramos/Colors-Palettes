import './App.css'
import Palette from './components/Palette/Palette.jsx'
import seedColors from './utilities/seedColors.js'
import {generatePalette} from './utilities/colorHelpers.js'

function App() {
  return (
    <main>
      <Palette palette={generatePalette(seedColors[1])}/>
    </main>
  )
}

export default App
