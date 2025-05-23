import './App.css'
import Palette from './components/Palette/Palette.jsx'
import seedColors from "./utilities/seedColors.js"

function App() {
  
  return (
    <main>
      <Palette {...seedColors[1]}/>
    </main>
  )
}

export default App
