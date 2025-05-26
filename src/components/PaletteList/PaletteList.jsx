import React, { Component } from 'react'
import styles from './PaletteList.module.css'
import {Link} from 'react-router-dom'
import MiniPalette from '../MiniPalette/MiniPalette.jsx'

class PaletteList extends Component{

  render(){
    const {palettes} = this.props
    return(
      <div>
        
        <h1>React Colors</h1>
        {palettes.map(palette=>
          <MiniPalette {...palette}/>
        )}
      </div>
    )
  }
}

export default PaletteList