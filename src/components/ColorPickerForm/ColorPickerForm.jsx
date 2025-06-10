import { Component } from 'react';
import styles from './ColorPickerForm.module.css'
import {ChromePicker} from 'react-color'
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import chroma from 'chroma-js'


export default class ColorPickerForm extends Component {

  constructor(props){
    super(props)
  }

  render() {
    const {
      newColor,
      handleChangeComplete,
      handleSubmit,
      addNewColor,
      register,
      errors,
      colors,
      maxColors,
    } = this.props

    const isDarkColor = chroma(newColor).luminance() <= 0.08
    const isLightColor = chroma(newColor).luminance() >= 0.7

    /* Custom validation */
    const isColorNameUnique = (inputValue) => {
      return colors.every((color) => color.name.toLowerCase()!==inputValue.toLowerCase())
    }

    const isColorUnique = () => {
      return colors.every((color) => color.color !== newColor)
    }

    return (
      <div className={styles.container}>
        <ChromePicker 
          className={styles.picker}
          color={newColor} 
          onChangeComplete={handleChangeComplete}
        />
        
        {/* Form added with react-hook-form */}
        <form onSubmit={handleSubmit(addNewColor)}>
          <input
            variant='filled'
            margin='normal'
            placeholder='Color Name'
            className={styles.colorNameInput}
            {...register("colorInput", { 
              required: "You must write a name",
              validate: {
                isUnique: v => isColorNameUnique(v) ||"Color Name must be unique!",
                isColorUnique: v => isColorUnique() ||"Color already Used!"
              }
            })}
          />
          {errors.colorInput && <p>{errors.colorInput.message}</p>}        

          <Button 
            className={styles.addColor}
            variant="contained" 
            color="primary"
            style={
              {backgroundColor:`${colors.length >= maxColors ? "grey" : newColor }`,
              color: isLightColor ? "black" : "white"}
            }
            type="submit"
            disabled={colors.length >= maxColors}
            >
              {colors.length >= maxColors?"Palette is Full":"Add Color"}
          </Button>
          <Divider />
        </form>
      </div>
    )
  }
}

