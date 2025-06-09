import { Component } from 'react';
import styles from './PaletteFooter.module.css'

class PaletteFooter extends Component{

  render(){
    const {paletteName,emoji} = this.props
    return(
      <footer className={styles.palette_footer}>
        {this.props.paletteName}
        <span className={styles.emoji}>{emoji}</span>
      </footer>
    )
  }
}

export default PaletteFooter