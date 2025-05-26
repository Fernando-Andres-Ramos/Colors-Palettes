import React from 'react'
import { css} from '@emotion/react'
import styled from '@emotion/styled'


const Root = styled.div`
  height: 100%;
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
  background-color: #dae1e4;
  height: 150px;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
`

const Title= styled.h5`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  color: black;
  padding: 0.5rem;
  font-size: 1rem;
  position: relative;
`

const Emoji= styled.span`
  align-self: center;
`

const MiniColor = styled.div`
  height:25%;
  width: 20%;
  display: inline-block;
  margin: 0 auto;
  position: relative;
  margin-bottom: -3.5px;
`

function MiniPalette(props){

  const MiniColorBoxes = props.colors.map(color => (
    <MiniColor 
      style={{backgroundColor:color.color}}
      key={color.name}
      >
    </MiniColor>
  ))

  const {paletteName,emoji} = props 
  return(
  <Root>
    <Colors className="colors" >
      {MiniColorBoxes}
    </Colors>
    <Title className="title">
      {paletteName}
      <Emoji className="emoji">{emoji}</Emoji>
    </Title>
  </Root>
  )
}

export default MiniPalette