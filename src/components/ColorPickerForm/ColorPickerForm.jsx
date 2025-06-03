import { Component } from 'react';
import Divider from '@mui/material/Divider';
import {ChromePicker} from 'react-color'
import Button from '@mui/material/Button';

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
      isColorNameUnique,
      isColorUnique
    } = this.props

    return (
      <div>
        <ChromePicker 
          color={newColor} 
          onChangeComplete={handleChangeComplete}
        />
        
        {/* Form added with react-hook-form */}
        <form onSubmit={handleSubmit(addNewColor)}>
          <label>Color Name</label>
          <input
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
            variant="contained" 
            color="primary"
            style={{backgroundColor:`${colors.length >= maxColors ? "grey" : newColor }`}}
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

