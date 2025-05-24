import React, { Component } from 'react'
import styles from './Palette.module.css'
import ColorBox from "../ColorBox/ColorBox.jsx"
import Navbar from "../Navbar/Navbar.jsx"


export default class Palette extends Component{

  constructor(props){
    super(props);
    this.state={level:500}

    this.changeLevel = this.changeLevel.bind(this)
  }

  changeLevel(level){
    this.setState({level})
  }

  render(){
    const {colors} = this.props.palette
    const {level} = this.state
    const colorBoxes = colors[this.state.level].map(color=>(
      <ColorBox background={color.hex} name={color.name}/>
    ))
    return(
      <div className={styles.palette}>
        <Navbar defaultValue={level} changeLevel={this.changeLevel}/>
        <div className={styles.palette_colors}>{colorBoxes}</div>
        {/* footer eventually */}
      </div>
    )
  }
}