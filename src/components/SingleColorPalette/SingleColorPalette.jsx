import { Component } from 'react';
import {Link} from 'react-router-dom'
import ColorBox from '../ColorBox/ColorBox.jsx'
import Navbar from '../Navbar/Navbar.jsx'
import PaletteFooter from "../PaletteFooter/PaletteFooter.jsx"
import styles from './SingleColorPalette.module.css'
import styles2 from '../ColorBox/ColorBox.module.css'
import { motion} from 'framer-motion';



class SingleColorPalette extends Component{

  constructor(props){
    super(props)
    this._shades = this.gatherShades(this.props.palette, this.props.colorId)
    this.changeSelectValue = this.changeSelectValue.bind(this)
    this.state=({format:"hex"})
  }

  gatherShades(palette, colorToFilterBy){
    let shades = [];
    let allColors = palette.colors;
    for(let key in allColors){
      shades = shades.concat(
        allColors[key].filter(function(color){
          return color.id === colorToFilterBy
        })
      )
    }
    return shades.slice(1)
    //return all the shades of a given color
  }

  changeSelectValue(value){
    this.setState({format:value})
  }

  render(){
    const {format} = this.state
    const {emoji, paletteName, id} = this.props.palette
    const colorBoxes = this._shades.map(color=>
      <ColorBox 
        key={color.name} 
        name={color.name}
        background={color[format]} 
        showLink={false}
        isSingleColor={true}
      />
    )
    return(
      <div className={`${styles.palette}`}>
        <Navbar
          changeSelectValue={this.changeSelectValue}
          isSingleColor={false}
        />
        <div className={styles.palette_colors}>
          {colorBoxes}
          <div className={styles2.goBack}>
            <Link to={`/palette/${id}`} className={styles2.copy_button} >GO BACK</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji}/>
      </div>
    )
  }
}

export default SingleColorPalette