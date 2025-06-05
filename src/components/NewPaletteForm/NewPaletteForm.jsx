import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./NewPaletteForm.module.css"
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import DraggableColorList from "../DraggableColorList/DraggableColorList.jsx"
import { useForm } from "react-hook-form";
import PaletteFormNav from "../PaletteFormNav/PaletteFormNav.jsx"
import ColorPickerForm from "../ColorPickerForm/ColorPickerForm.jsx"

/* Estilos */
const drawerWidth = 400; //Tamaño maximo del sideBar

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
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

  const maxColors=20;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [newColor, setNewColor] = React.useState("#ADD8E")
  const [colorName, setColorName] = React.useState("")
  const [colors, setColors] = React.useState(props.palettes[0].colors)
  const [newPaletteName, setNewPaletteName] = React.useState("")

  const {register,handleSubmit,watch, formState: { errors }} = useForm({mode:'onChange'});

  const {
    register:register2,
    handleSubmit:handleSubmit2,
    watch:watch2, 
    formState: { errors:errors2 }} = useForm({mode:'onChange'});

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

  /* Clear de initial palette */
  const clearColors = () =>{
    setColors([])
  }

  /* Choose a random color from all palettes */
  const addRandomColor = () => {
    const allColors = props.palettes.map(p=>p.colors).flat()
    const rand = Math.floor(Math.random() * allColors.length)
    const randomColor = allColors[rand]
    setColors([...colors, randomColor])
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
    
    <PaletteFormNav 
      open={open} 
      handleDrawerOpen={handleDrawerOpen}
      handleDrawerClose={handleDrawerClose}
      handleSubmit2={handleSubmit2}
      register2={register2}
      handleSavePalette={handleSavePalette}
      errors2={errors2}
      isPaletteNameUnique={isPaletteNameUnique}
    />

      <Drawer className={styles.drawerPaper}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display:'flex',
            alignItems:'center',
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

        <div className={styles.container}>
          <Typography variant="h4">Design Your Palette </Typography>

          <div className={styles.buttons}>
            <Button className={styles.button} variant="contained" color="secondary" onClick={clearColors}>CLEAR PALETTE</Button>
            <Button className={styles.button} variant="contained" color="primary"  onClick={addRandomColor} disabled={colors.length >= maxColors}>RANDOM COLOR</Button>
          </div>
          
          <ColorPickerForm 
            newColor = {newColor}
            handleChangeComplete={handleChangeComplete}
            handleSubmit={handleSubmit}
            addNewColor={addNewColor}
            register={register}
            errors={errors}
            colors={colors}
            maxColors={maxColors}
            isColorNameUnique={isColorNameUnique}
            isColorUnique={isColorUnique}
          />
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList colors={colors} removeColor={removeColor}/>
      </Main>
    </Box>
  );
}