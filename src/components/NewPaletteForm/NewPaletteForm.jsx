import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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
import DraggableColorList from "../DraggableColorList/DraggableColorList.jsx"
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
export default function NewPaletteForm(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [newColor, setNewColor] = React.useState("#ADD8E")
  const [colorName, setColorName] = React.useState("")
  const [colors, setColors] = React.useState([])
  const [newPaletteName, setNewPaletteName] = React.useState("")

  const {register,handleSubmit,watch, formState: { errors }} = useForm({mode:'onBlur'});

  const {
    register:register2,
    handleSubmit:handleSubmit2,
    watch:watch2, 
    formState: { errors:errors2 }} = useForm({mode:'onBlur'});

  const navigate = useNavigate();

  
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

  /* Delete color */
  const removeColor = (colorName) => {
    setColors(colors.filter(color=>color.name !== colorName))
  }

  /* watch is a method from "useForm" hook */
  React.useEffect(() => {
    setColorName(watch("colorInput"))
    setNewPaletteName(watch2("nameInput"))
  }, [watch("colorInput"),watch2("nameInput")])


  /* Custom validation */
  const isColorNameUnique = (inputValue) => {
    return colors.every((color) => color.name.toLowerCase()!==inputValue.toLowerCase())
  }

  const isColorUnique = () => {
    return colors.every((color) => color.color !== newColor)
  }

  const isPaletteNameUnique = (inputValue) => {
    return props.palettes.every((palette) => palette.paletteName.toLowerCase()!==inputValue.toLowerCase())
  }

  /* Save the newPalette to the "database" */
  const handleSavePalette = () =>{
    const newName = newPaletteName
    const newPalette = {
      paletteName:newName, 
      colors: colors, 
      emoji:"NEW", 
      id:newName.toLowerCase().replace(/ /g, "-")}
    props.savePalette(newPalette)
    navigate('/')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
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


        {/* Form added with react-hook-form */}
        <form onSubmit={handleSubmit2(handleSavePalette)}>
          <label>Palette Name</label>
          <input
            {...register2("nameInput", { 
              required: "You must write a name",
              validate: {
                nameUnique: v => isPaletteNameUnique(v) ||"Palette name already used!",
              }
            })}
          />
          {errors2.nameInput && <p>{errors2.nameInput.message}</p>}
          
          <Button 
            variant="contained" 
            color="primary"
            type="submit">
              Save Palette
          </Button>
        </form>

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
          <Button variant="contained" color="secondary">CLEAR PALETTE</Button>
          <Button variant="contained" color="primary">RANDOM COLOR</Button>
        </div>
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
        <DraggableColorList colors={colors} removeColor={removeColor}/>
      </Main>
    </Box>
  );
}