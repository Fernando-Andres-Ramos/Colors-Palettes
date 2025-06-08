import React, { Component } from 'react'
import DraggableColorBox from '../DraggableColorBox/DraggableColorBox.jsx'
import styles from "./DraggableColorList.module.css"


export default function DraggableColorList({colors,removeColor}){
  
  return(
    <div className={styles.container} >
      {colors.map(color=>
        <DraggableColorBox 
          key={color.name} 
          color={color.color} 
          name={color.name}
          removeColor={removeColor}
        />
      )}
    </div>
  )
}