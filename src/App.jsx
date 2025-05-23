import './App.css'
import Palette from './components/Palette.jsx'
import seedColors from "./utilities/seedColors.js"

function App() {
  
  return (
    <main>
      <Palette {...seedColors[5]}/>
    </main>
  )
}

export default App
