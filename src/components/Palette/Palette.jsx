import { Component } from 'react';
import styles from './Palette.module.css'
import ColorBox from "../ColorBox/ColorBox.jsx"
import Navbar from "../Navbar/Navbar.jsx"
import PaletteFooter from "../PaletteFooter/PaletteFooter.jsx"
import { motion} from 'framer-motion';


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
    const {colors,paletteName,emoji,id} = this.props.palette
    const {level,format} = this.state
    const colorBoxes = colors[this.state.level].map(color=>(
      <ColorBox 
        paletteId={id}
        background={color[format]} 
        name={color.name}
        key={color.id}
        id={color.id}
        showLink={true}
        isSingleColor={false}/>
    ))
    return(
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7}}
      style={{ 
        position: "absolute", 
        width: "100%", 
        height: "100%", 
        top: 0, 
        left: 0 
      }}
      >
        <div className={styles.palette}>
          <Navbar 
            defaultValue={level} 
            changeLevel={this.changeLevel} 
            changeSelectValue={this.changeSelectValue}
            isSingleColor={true}/>
          <div className={styles.palette_colors}>{colorBoxes}</div>
          <PaletteFooter paletteName={paletteName} emoji={emoji}/>
        </div>
      </motion.div>
    )
  }
}