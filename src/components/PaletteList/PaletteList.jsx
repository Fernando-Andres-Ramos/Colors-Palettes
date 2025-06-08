import React, { Component, useEffect, useState } from 'react'
import styles from './PaletteList.module.css'
import {Link, useNavigate} from 'react-router-dom'
import MiniPalette from '../MiniPalette/MiniPalette.jsx'
import { css} from '@emotion/react'
import styled from '@emotion/styled'


const Root = styled.div`
  background-color: blue;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items:flex-start;
`
const PaletteList_Container = styled.div`
  width: 60%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center
  align-items: flex-start;
  gap: 0.5rem;

  @media (max-width:1400px){
    width: 80%;
  }

  @media (max-width:1199.98px){
    width: 80%;
  }

  @media (max-width:991.98px){
    width: 80%;
  }

  @media (max-width:767.98px){
    width: 90%;
  }

  @media (max-width:575.98px){
    width: 75%;
  }
`
const PaletteList_Nav = styled.nav`
  width: 100%; 
  display: flex;
  flex-flow:row nowrap
  justify-content: space-between;
  align-items:center;
  a {
    text-decoration:none;
    color:white
  }
`
const Palettes = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3,30%);
  grid-gap: 3rem;
  justify-content: center;

  @media (max-width:767.98px){
    grid-template-columns: repeat(2,45%);
  }

  @media (max-width:575.98px){
    grid-template-columns: repeat(1,90%);
    grid-gap: 2rem;
  }
`
const Title = styled.h1`
  width: 100%;
  color: white;
  font-size: 1.5rem;
  font-weight: 800;
`

function PaletteList(props){

  const [id, setId] = useState("")
  const navigate = useNavigate()

  const {palettes, deletePalette} = props
  return(
    <Root>
      <PaletteList_Container>
        <PaletteList_Nav>
          <Title>React Colors</Title>
          <Link to="/palette/new">Create New Palette</Link>
        </PaletteList_Nav>
        <Palettes> 
          {palettes.map(palette => 
            <Link
              to={`/palette/${palette.id}`}
              key={palette.id}>
              <MiniPalette {...palette} deletePalette={deletePalette}/></Link>
          )}
        </Palettes>
      </PaletteList_Container>
    </Root>
  )
}

export default PaletteList