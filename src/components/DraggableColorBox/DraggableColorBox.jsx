import React, { Component } from 'react'
import styles from "./DraggableColorBox.module.css"
import { css} from '@emotion/react'
import styled from '@emotion/styled'

const Root = styled.div`
  width:20%;
  height: 25%;
  margin: 0 auto;
  display: inline-block;
  position: relative;
  cursor:pointer; 
  margin-bottom: -4px;
`


export default function DraggableColorBox(props){
  return(
    <Root style={{backgroundColor:props.color}}>
      {props.name}
    </Root>
  )
}