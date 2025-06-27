import {useState} from 'react';
import styles from './Navbar.module.css'
import {Link} from 'react-router-dom'
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import useWindowSize from "../../hooks/useWindowSize.jsx"


export default function Navbar(props){

  const [format,setFormat] = useState("hex")
  const [open,setOpen] = useState(false)
  const [windowWidth, windowHeight] = useWindowSize()

  const handleChange = (e) =>{
    props.changeLevel(e.target.value)
  }

  const handleSelectChange = (e) => {
    setFormat(e.target.value)
    setOpen(true)
    props.changeSelectValue(e.target.value)
  }

  const closeSnackBar = () => {
    setOpen(false)
  }
  
  const {defaultValue, isSingleColor} = props

    return(
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">{windowWidth>575.98?"ReactColorPicker":<KeyboardReturnIcon/>}</Link>
        </div>
        {
          isSingleColor && (
            <div className={styles.textAndSlider_container}>
              <span>Level: {defaultValue}</span>
              <div className={styles.slider_container}>
                <input type="range" 
                  min="100" 
                  max="900" 
                  defaultValue={`${defaultValue}`} 
                  onChange={handleChange}
                  step="100"
                  className={styles.slider}/>
              </div>
            </div>
          )
        }
        <div className={styles.select_container}>
          <Select className={styles.select} value={format} onChange={handleSelectChange}>
            <MenuItem  value="hex">HEX - #ffffff</MenuItem>
            <MenuItem  value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem  value="rgba">RGBA - rgba(255,255,255,0)</MenuItem>
          </Select>
        </div>
        <Snackbar 
          anchorOrigin={{vertical:"bottom", horizontal:"left"}}
          open={open}
          autoHideDuration={3000}
          message={<span id="message-id">Format Changed to {format}!</span>}
          ContentProps={{
            "aria-describedby":"message-id"
          }}
          onClose = {closeSnackBar}
          action={[
            <IconButton 
              onClick={closeSnackBar} 
              color="inherit"
              key="close"
              aria-label="close">
              <CloseIcon/>
            </IconButton>
          ]}>
          </Snackbar>
      </header>
    )
}
