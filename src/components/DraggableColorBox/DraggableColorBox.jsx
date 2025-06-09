import styled from '@emotion/styled'
import DeleteIcon from '@mui/icons-material/Delete';

const Root = styled.div`
  width:100%;
  height: 100%;
  margin: 0 auto;
  display: inline-block;
  position: relative;
  cursor:pointer; 
  color:rgba(0,0,0,0.5);
  &:hover svg{
    color white;
    fill: white;
    transform:scale(1.3)
  }

  svg {
    transition:all 0.3s ease-in-out;
  }
`;

const BoxContent = styled.div`
  position:absolute;
  width: 100%;
  left:0px;
  bottom:0px;
  padding: 10px;
  letter-spacing: 1px;
  font-size: 12px;
  text-transform: uppercase;
  display:flex;
  justify-content: space-between;
  align-items: center
`;


export default function DraggableColorBox(props){

  const {color,name,removeColor} = props

  const handleClick = () =>{
    props.removeColor(name)
  }
  
  return(
    <Root style={{backgroundColor:color}}>
      <BoxContent>
        <span>{name}</span>
        <DeleteIcon onClick={handleClick}/>
      </BoxContent>
    </Root>
  )
}