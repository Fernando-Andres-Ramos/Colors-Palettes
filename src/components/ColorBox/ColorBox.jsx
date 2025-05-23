import React, { Component } from 'react'
import styles from './ColorBox.module.css'


export default class ColorBox extends Component{

  render(){
    const {name,background} = this.props
    return(
      <div style={{background}} className={styles.colorBox}>
        <div className={styles.copy_container}>
          <div className={styles.box_content}>
            <span>{this.props.name}</span>
          </div>
          <button className={styles.copy_button}>Copy</button>
        </div>
        <span className={styles.seeMore}>More</span>
      </div>
    )
  }
}