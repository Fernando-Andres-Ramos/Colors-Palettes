import React from 'react'
import { css} from '@emotion/react'
import styled from '@emotion/styled'


const Root = styled.div`
  background-color: white;
  border-radius: 5px;
  border:1px solid black;
  padding: 0.5rem;
  position:relative;
  overflow: hidden;
  &:hover{
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0,0,0,0.3);
  }
`

const Colors = styled.div`
  background-color: #grey;
`

const Title= styled.h5`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  color: black;
  padding: 0.5rem;
  font-size: 1rem;
  position: relative;
`

const Emoji= styled.span`
  marginLeft: 0.5rem;
  font-size: 1.5rem;
`

function MiniPalette(props){

  const {paletteName,emoji} = props 
  return(
  <Root>
    <Colors className="colors" ></Colors>
    <Title className="title">
      {paletteName}
      <Emoji className="emoji">{emoji}</Emoji>
    </Title>
  </Root>
  )
}

export default MiniPalette