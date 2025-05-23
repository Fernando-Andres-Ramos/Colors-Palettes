import React, { Component } from 'react'
import ColorBox from "../ColorBox/ColorBox.jsx"
import styles from './Palette.module.css'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'


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
        <Slider defaultValue = {level} 
                min={100} 
                max={900}
                step={100}
                onChangeComplete={this.changeLevel}/>
        {/* Navbar here */}
        <div className={styles.palette_colors}>{colorBoxes}</div>
        {/* footer eventually */}
      </div>
    )
  }
}