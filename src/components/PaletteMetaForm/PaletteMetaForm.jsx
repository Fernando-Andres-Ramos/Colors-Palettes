import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PaletteMetaForm(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {handleSavePalette,register2,errors2,isPaletteNameUnique} = props

  const handleSubmit = (name) =>{
    handleSavePalette(name)
  }

  return (
    <React.Fragment>
      <div variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              handleSubmit(formJson.nameInput)
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Create a new palette!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
              <input
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button 
              variant="contained" 
              color="primary"
              type="submit">
                Save Palette
            </Button>
          </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
