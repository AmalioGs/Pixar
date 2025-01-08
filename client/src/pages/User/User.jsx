import { useContext } from 'react'
import { PixarContext } from '../../context/ContextProvider'
import { Button, Col, Container, Row } from 'react-bootstrap';
import fotoPerfil from '../../assets/avatar.png'
import { useNavigate } from 'react-router-dom';

export const User = () => {
  const {user} = useContext(PixarContext);
  const navigate = useNavigate();

  return (
    <>
    <Container>
      <Row>
        <Col>
        <img src={
          user.user_avatar ? `http://localhost:4000/images/users/${user.user_avatar}` : fotoPerfil
        } />
        </Col>
        <Col>
        <h2>{user.user_name} {user.user_lastname} <Button variant='outline' onClick={()=>navigate('/editUser')}>✏️</Button></h2> 
        <p>{user.user_birthdate}</p> 
        <p>{user.user_email}</p> 
        <p>{user.user_description}</p> 
        </Col>
      </Row>
      <Row>
        <Col>
        Mis películas favoritas:
        </Col>
      </Row>
    </Container>
    </>
  )
}
