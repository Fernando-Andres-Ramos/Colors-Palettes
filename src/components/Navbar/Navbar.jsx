import React, { Component } from 'react'
import styles from './Navbar.module.css'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export default class Navbar extends Component{
  constructor(props){
    super(props)

    this.state = {format:"hex"}

    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleChange(e){
    this.props.changeLevel(e.target.value)
  }

  handleSelectChange(e){
    this.setState({format:e.target.value})
    this.props.changeSelectValue(e.target.value)
  }
  

  render(){
    const {defaultValue} = this.props
    return(
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <a href="#">ReactColorPicker</a>
        </div>
        <div className={styles.textAndSlider_container}>
          <span>Level: {defaultValue}</span>
          <div className={styles.slider_container}>
            <input type="range" 
              min="100" 
              max="900" 
              defaultValue={`${defaultValue}`} 
              onChange={this.handleChange}
              step="100"
              className={styles.slider}/>
          </div>
        </div>
        <div className={styles.select_container}>
          <Select value={this.state.format} onChange={this.handleSelectChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,0)</MenuItem>
          </Select>
        </div>
      </header>
    )
  }
}
