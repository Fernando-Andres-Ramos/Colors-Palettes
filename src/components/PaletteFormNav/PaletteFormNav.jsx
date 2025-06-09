import { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './PaletteFormNav.module.css'

import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

import PaletteMetaForm from '../PaletteMetaForm/PaletteMetaForm.jsx'


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const drawerWidth = 400;


export default class PaletteFormNav extends Component{
  constructor (props){
    super(props)
    this.state = ({ 
      formShowing: false
    })

    this.showForm = this.showForm.bind(this)
    this.hideForm = this.hideForm.bind(this)
  }

  showForm(){
    this.setState({formShowing:true})
  }

  hideForm(){
    this.setState({formShowing:false})
  }

  render(){
    const {
      classes,
      open,
      handleDrawerClose,
      handleDrawerOpen,
      register2,
      handleSavePalette,
      errors2,
      palettes,
      handleSubmit2} = this.props

    return(
      <div>
        <CssBaseline />
        <AppBar position="fixed" open={open} color="default">
          <Toolbar className={styles.toolbar}>
            <div className={styles.buttonAndText}>
              <IconButton
                styles={{alignSelf:"center"}}
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[
                  {
                    mr: 2,
                  },
                  open && { display: 'none' },
                ]}
              >
                <AddToPhotosIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Create a palette
              </Typography>
            </div>

            {this.state.formShowing && (
              <PaletteMetaForm
                handleSavePalette={handleSavePalette} 
                register2={register2} 
                errors2={errors2}  
                palettes={palettes}
                handleSubmit2={handleSubmit2}
                hideForm={this.hideForm}
              />  
            )}
            
            <div className={styles.navButtons}>
              <Link to='/'>
                <Button className={styles.button} variant='contained' color='secondary'>
                  Go Back
                </Button>
              </Link>

              <div 
                className={styles.openModal_button} 
                variant="contained" 
                onClick={this.showForm}>
                Save
              </div>
            </div>

          </Toolbar>
        </AppBar>
      </div>
    )
  }
}