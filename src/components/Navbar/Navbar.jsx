import React, { Component } from 'react'
import styles from './Navbar.module.css'


export default class Navbar extends Component{
  constructor(props){
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    this.props.changeLevel(e.target.value)
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
      </header>
    )
  }
}
