import React, { Component } from 'react'
import styles from './PaletteList.module.css'
import {Link} from 'react-router-dom'
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
  width: 50%;
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  gap: 1rem;
`
const PaletteList_Nav = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
const Palettes = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3,30%);
  grid-gap: 5%;
`

const Title = styled.h1`
  width: 100%;
  color: white;
  font-size: 1.5rem;
  font-weight: 800;
`

class PaletteList extends Component{

  render(){
    const {palettes} = this.props
    return(
      <Root>
        <PaletteList_Container>
          <PaletteList_Nav>
            <Title>React Colors</Title>
          </PaletteList_Nav>
          <Palettes>
            {palettes.map(palette=>
              <MiniPalette {...palette}/>
            )}
          </Palettes>
        </PaletteList_Container>
      </Root>
    )
  }
}

export default PaletteList