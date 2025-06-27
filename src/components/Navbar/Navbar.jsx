import { Component } from 'react';
import styles from './Navbar.module.css'
import {Link} from 'react-router-dom'
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RestartAltIcon from '@mui/icons-material/RestartAlt';


export default class Navbar extends Component{
  constructor(props){
    super(props)

    this.state = {format:"hex", open:false}

    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.closeSnackBar = this.closeSnackBar.bind(this)

  }

  handleChange(e){
    this.props.changeLevel(e.target.value)
  }

  handleSelectChange(e){
    this.setState({format:e.target.value,open:true})
    this.props.changeSelectValue(e.target.value)
  }

  closeSnackBar(){
    this.setState({open:false})
  }
  

  render(){
    const {defaultValue, isSingleColor} = this.props
    return(
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">ReactColorPicker</Link>
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
                  onChange={this.handleChange}
                  step="100"
                  className={styles.slider}/>
              </div>
            </div>
          )
        }
        <div className={styles.select_container}>
          <Select className={styles.select} value={this.state.format} onChange={this.handleSelectChange}>
            <MenuItem  value="hex">HEX - #ffffff</MenuItem>
            <MenuItem  value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem  value="rgba">RGBA - rgba(255,255,255,0)</MenuItem>
          </Select>
        </div>
        <Snackbar 
          anchorOrigin={{vertical:"bottom", horizontal:"left"}}
          open={this.state.open}
          autoHideDuration={3000}
          message={<span id="message-id">Format Changed to {this.state.format}!</span>}
          ContentProps={{
            "aria-describedby":"message-id"
          }}
          onClose = {this.closeSnackBar}
          action={[
            <IconButton 
              onClick={this.closeSnackBar} 
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
}
