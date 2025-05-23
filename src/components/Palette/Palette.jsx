import React, { Component } from 'react'
import ColorBox from "../ColorBox/ColorBox.jsx"
import styles from './Palette.module.css'


export default class Palette extends Component{

  render(){
    const colorBoxes = this.props.colors.map(color=>(
      <ColorBox background={color.color} name={color.name}/>
    ))
    return(
      <div className={styles.palette}>
        {/* Navbar here */}
        <div className={styles.palette_colors}>{colorBoxes}</div>
        {/* footer eventually */}
      </div>
    )
  }
}