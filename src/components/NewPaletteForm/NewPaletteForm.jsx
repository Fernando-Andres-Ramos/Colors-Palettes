import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {ChromePicker} from 'react-color'
import Button from '@mui/material/Button';
import DraggableColorBox from "../DraggableColorBox/DraggableColorBox.jsx"
import { useForm, Controller } from "react-hook-form";


const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    height:`calc(100vh - 64px)`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
);

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



/* Empieza el componente de React */
export default function NewPaletteForm() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [newColor, setNewColor] = React.useState("#ADD8E")
  const [colors, setColors] = React.useState([])
  const [colorName, setColorName] = React.useState("")

  const {register,handleSubmit,watch, formState: { errors }} = useForm();

  
  /* Open and close the Drawer component from material-ui */
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };

  /* Set color from colorPicker/ChromePicker  */
  const handleChangeComplete = (color) => {
    setNewColor(color.hex )
  };

  /* Add a new color with name and color-code to the new palette */
  const addNewColor = () => {
    const colorToAdd = {name:colorName, color:newColor }
    setColors([...colors, colorToAdd])
  }

  /* watch is a method from "useForm" hook */
  React.useEffect(() => {
    setColorName(watch("colorInput"))
  }, [watch("colorInput")])


  /* Custom validation */
  const isColorNameUnique = (inputValue) => {
    return colors.every((color) => color.name.toLowerCase()!==inputValue.toLowerCase())
  }

  const isColorUnique = () => {
    return colors.every((color) => color.color !== newColor)
  }
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant="h4">Design Your Palette </Typography>

        <div>
          <Button variant="contained" color="secondary">CREATE PALETTE</Button>
          <Button variant="contained" color="primary">RANDOM COLOR</Button>
        </div>
        <ChromePicker 
          color={newColor} 
          onChangeComplete={handleChangeComplete}
        />
        

        {/* Form added with react-hook-form */}
        <form onSubmit={handleSubmit(addNewColor)}>
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
            style={{backgroundColor:`${newColor}`}}
            type="submit"
            >
              ADD COLOR
          </Button>
          <Divider />
        </form> 

        
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <ul style={{height:"100%"}}>
          {colors.map(color=>
            <DraggableColorBox key={color.name} color={color.color} name={color.name}/>
          )}
        </ul>
      </Main>
    </Box>
  );
}