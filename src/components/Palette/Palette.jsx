import React, { Component } from 'react'
import ColorBox from "../ColorBox/ColorBox.jsx"
import styles from './Palette.module.css'


export default class Palette extends Component{

  constructor(props){
    super(props);
    this.state={level:500}

    this.changeLevel = this.changeLevel.bind(this)
  }

  changeLevel(e){
    let level = e.target.value
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
        <div className={styles.slider_container}>
          <input type="range" 
            min="100" 
            max="900" 
            defaultValue={`${this.state.level}`} 
            onChange={this.changeLevel}
            step="100"
            className={styles.slider}/>
        </div>
        {/* Navbar here */}
        <div className={styles.palette_colors}>{colorBoxes}</div>
        {/* footer eventually */}
      </div>
    )
  }
}