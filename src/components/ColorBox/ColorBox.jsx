import React, { Component } from 'react'
import styles from './ColorBox.module.css'
import {Link} from 'react-router-dom'


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
    const {name,background,paletteId,id,showLink} = this.props
    const {copied} = this.state
    return(
      <div onClick={this.handleCopy} style={{background}} className={styles.colorBox}>
        <div style={{background}} 
            className={`${styles.copy_overlay} ${copied && styles.show}`}/>
        <div className={`${styles.copiedMessage} ${copied && styles.show}`}>
          <h1>Copied!</h1>
          <p>{this.props.background}</p>
        </div>
        <div className={styles.copy_container}>
          <div className={styles.box_content}>
            <span>{this.props.name}</span>
          </div>
          <button className={styles.copy_button}>Copy</button>
        </div>
        {
          showLink && (
          <Link
            to={`/palette/${paletteId}/${id}`} 
            onClick={(e)=>e.stopPropagation()} 
            className={styles.seeMore}>
              More
          </Link>
        )}
        
      </div>
    )
  }
}
