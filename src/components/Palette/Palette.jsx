import React, { Component } from 'react'
import styles from './Palette.module.css'
import ColorBox from "../ColorBox/ColorBox.jsx"
import Navbar from "../Navbar/Navbar.jsx"


export default class Palette extends Component{

  constructor(props){
    super(props);
    this.state={level:500,format:"hex"}

    this.changeLevel = this.changeLevel.bind(this)
    this.changeSelectValue=this.changeSelectValue.bind(this)
    
  }

  changeLevel(level){
    this.setState({level})
  }

  changeSelectValue(value){
    this.setState({format:value})
  }

  render(){
    const {colors} = this.props.palette
    const {level,format} = this.state
    const colorBoxes = colors[this.state.level].map(color=>(
      <ColorBox background={color[format]} name={color.name}/>
    ))
    return(
      <div className={styles.palette}>
        <Navbar 
          defaultValue={level} 
          changeLevel={this.changeLevel} 
          changeSelectValue={this.changeSelectValue}/>
        <div className={styles.palette_colors}>{colorBoxes}</div>
        {/* footer eventually */}
      </div>
    )
  }
}