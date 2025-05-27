import React, { Component } from 'react'
import styles from './ColorBox.module.css'
import {Link} from 'react-router-dom'
import chroma from 'chroma-js'


export default class ColorBox extends Component{
  constructor(props){
    super(props)

    this.state = ({
      copied:false
    })

    this.handleCopy=this.handleCopy.bind(this)
  }

  handleCopy(){
    {navigator.clipboard.writeText(this.props.background)} //copia algo al clipboard

    this.setState({copied:true},
      ()=>{
        setTimeout(() => {
        this.setState({copied:false})
      }, 1500);
    });
  }

  render(){
    const {name,background,paletteId,id,showLink,isSingleColor} = this.props
    const {copied} = this.state
    const isDarkColor = chroma(background).luminance() <= 0.08
    const isLightColor = chroma(background).luminance() >= 0.7
    return(
      <div 
        onClick={this.handleCopy} 
        style={{background}} 
        className={`${styles.colorBox} ${isSingleColor && styles.singleColor}`}>
        <div style={{background}} 
            className={`${styles.copy_overlay} ${copied && styles.show}`}/>
        <div className={`${styles.copiedMessage} ${copied && styles.show}`}>
          <h1>Copied!</h1>
          <p className={`${isLightColor && styles.dark_text}`} >{this.props.background}</p>
        </div>
        <div className={styles.copy_container}>
          <div className={styles.box_content}>
            <span className={`${isDarkColor && styles.light_text} `}>{this.props.name}</span>
          </div>
          <button className={`${styles.copy_button} ${isLightColor && styles.dark_text}`}>Copy</button>
        </div>
        {
          showLink && (
          <Link
            to={`/palette/${paletteId}/${id}`} 
            onClick={(e)=>e.stopPropagation()}>
              <span className={`${styles.seeMore} ${isLightColor && styles.dark_text}`}>More</span>
          </Link>
        )}
        
      </div>
    )
  }
}
