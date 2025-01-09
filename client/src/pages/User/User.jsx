import { useContext, useEffect, useState } from 'react'
import { PixarContext } from '../../context/ContextProvider'
import { Button, Col, Container, Row } from 'react-bootstrap';
import fotoPerfil from '../../assets/avatar.png'
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../Helpers/axiosHelper.js';

export const User = () => {
  const {user} = useContext(PixarContext);
  const navigate = useNavigate();
  const [favFilm, setFavFilm] = useState([])

  useEffect(()=>{
    const getFavFilm = async ()=>{
      try {
        const res = await fetchData(`user/getFavFilm/${user.user_id}`, 'get')
        setFavFilm(res.data)
        
        
      } catch (error) {
        console.log(error);
        
      }
    }
    getFavFilm() 
  }, [])
    
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
        <h3>Mis películas favoritas:</h3>
        {favFilm?.map(elem=>{
          return(
            <img 
            key={elem.film_id}
            src={elem.film_image}
            onClick={()=>navigate(`/oneFilm/${elem.film_id}`)}
            />
          )
        })}
        </Col>


      </Row>
    </Container>
    </>
  )
}
