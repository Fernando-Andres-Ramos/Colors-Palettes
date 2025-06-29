import { useState} from 'react';
import {Link} from 'react-router-dom'
import styles from './SingleColorPalette.module.css'
import styles2 from '../ColorBox/ColorBox.module.css'
import ColorBox from '../ColorBox/ColorBox.jsx'
import Navbar from '../Navbar/Navbar.jsx'
import PaletteFooter from "../PaletteFooter/PaletteFooter.jsx"
import useWindowSize from "../../hooks/useWindowSize.jsx"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function SingleColorPalette(props){

  const shades = gatherShades(props.palette, props.colorId)
  const [format,setFormat] = useState("hex")
  const [windowWidth, windowHeight] = useWindowSize()

  function gatherShades(palette, colorToFilterBy){
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

  function changeSelectValue(value){
    setFormat(value)
  }

  const {emoji,paletteName,id} = props.palette
  const colorBoxes = shades.map(color=>
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
        changeSelectValue={changeSelectValue}
        isSingleColor={false}
      />
      <div className={styles.palette_colors}>
        {colorBoxes}
        <div className={styles2.goBack}>
          <Link to={`/palette/${id}`} className={styles2.copy_button}>
            {windowWidth>575.98?"GO BACK":<KeyboardBackspaceIcon/>}
          </Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji}/>
    </div>
  )
}

export default SingleColorPalette