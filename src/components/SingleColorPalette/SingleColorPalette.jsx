import React, { Component } from 'react'
import ColorBox from '../ColorBox/ColorBox.jsx'
import styles from '../Palette/Palette.module.css'


class SingleColorPalette extends Component{

  constructor(props){
    super(props)
    this._shades = this.gatherShades(this.props.palette, this.props.colorId)
    console.log(this._shades)
  }

  gatherShades(palette, colorToFilterBy){
    let shades = [];
    let allColors = palette.colors;
    for(let key in allColors){
      shades = shades.concat(
        allColors[key].filter(function(color){
          return color.id === colorToFilterBy
        })
      )
    }
    return shades.slice(1)
    //return all the shades of a given color
  }

  render(){
    const colorBoxes = this._shades.map(color=>
      <ColorBox 
        key={color.id} 
        name={color.name}
        background={color.hex}
        showLink={false}
      />
    )
    return(
      <div className={styles.palette}>
        <h1>Single Color Palette</h1>
        <div className={styles.palette_colors}>{colorBoxes}</div>
      </div>
    )
  }
}

export default SingleColorPalette