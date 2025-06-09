import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import styles from './PaletteMetaForm.module.css'
import EmojiPicker from 'emoji-picker-react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function PaletteMetaForm(props) {
  const {handleSavePalette,register2,errors2,palettes,handleSubmit2,hideForm} = props

  const [open, setOpen] = React.useState("form");
  const [newPaletteName,setNewPaletteName] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const isPaletteNameUnique = (inputValue) => {
    return props.palettes.every((palette) => palette.paletteName.toLowerCase().replace(/ /g, "-")!==inputValue.toLowerCase().replace(/ /g, "-"));
  }

  const showEmojiPicker = (e) =>{
    setLoading(true)
    setTimeout(() => {
      setNewPaletteName(e.nameInput)
      setOpen("emoji")
    }, 100);
  }
  
  const submitData = (data) =>{
    handleSavePalette({emoji:data.emoji, newName:newPaletteName})
    setLoading(false)
    setOpen("")
  }

  return (
    <React.Fragment>
      <BootstrapDialog open={open==="emoji"} onClose={hideForm}>
        <DialogTitle>Pick a palette emoji!</DialogTitle>
        <EmojiPicker onEmojiClick={submitData}/>
      </BootstrapDialog>
      <BootstrapDialog
        onClose={hideForm}
        aria-labelledby="customized-dialog-title"
        open={open==="form"}
      >
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <form onSubmit={handleSubmit2(showEmojiPicker)}>
          <DialogContent dividers>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's unique!
            </DialogContentText>
            
            <input
              variant='filled'
              margin='normal'
              placeholder="Palette Name"
              className={styles.formInput}
              {...register2("nameInput", { 
                required: "You must write a name",
                validate: {
                  nameUnique: v => isPaletteNameUnique(v) ||"Palette name already used!",
                }
              })}
            />
            {errors2.nameInput && <p>{errors2.nameInput.message}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm}>Cancel</Button>
              <Button
                className={styles.submitButton}
                variant="contained" 
                color="primary"
                type="submit">
                  {loading?"Loading...":"Save Palette"}
              </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </React.Fragment>
  );
}