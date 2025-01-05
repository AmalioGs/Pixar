import axios from 'axios'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const initialValue = {
  user_name: "",
  user_lastname: "",
  user_email: "",
  user_password: "",
  repPassword: "",
  accept: false
}

export const Register = () => {
  const [register, setRegister] = useState(initialValue);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) =>{
    const {name, value} = e.target;

    if(name === "accept"){
      setRegister({...register, accept:e.target.checked})
    }else{
      setRegister({...register, [name]:value});
    }
  }  

  const onSubmit = () =>{
    if(!register.user_name || !register.user_lastname || !register.user_email || !register.user_password || !register.repPassword){
      setMsg("No puede haber ningún campo vacío")

    }else if(register.user_password !== register.repPassword){
      setMsg("Las contraseñas deben coincidir");

    }else if (!register.accept) {
      setMsg("Debes aceptar los términos y condiciones")
      
    }else{
      axios
          .post('http://localhost:4000/user/register', register)
          .then((res)=>{
            console.log(res);
          })

          .catch((err)=>{
            if(err){
              setMsg(err.response.data.msg)
            }
          })
    }
  }

  console.log(register);
  
  return (
    <Row className='d-flex justify-content-center'>
    <Col md={5} lg={4} >
      <Form>
        <h2>Formulario de Registro</h2>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Introduce tu nombre"
            value={register.user_name}
            onChange={handleChange} 
            name='user_name'/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastname">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Introduce tu apellido"
            value={register.user_lastname}
            onChange={handleChange} 
            name='user_lastname'/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Introduce el email"
            value={register.user_email}
            onChange={handleChange} 
            name='user_email'/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Contraseña" 
            value={register.user_password}
            onChange={handleChange} 
            name='user_password'/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicRepPassword">
          <Form.Label>Repite contraseña</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Repite contraseña"
            value={register.repPassword}
            onChange={handleChange} 
            name='repPassword' />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check 
            type="checkbox" 
            label="Acepto términos"
            checked={register.accept}
            onChange={handleChange} 
            name='accept'/>
        </Form.Group>
        <p>Ya estás registrado?<Link to='/login'>Login aquí</Link></p>
        <p style={{color:"red"}}>{msg}</p>
        <Button variant="primary" onClick={onSubmit}>
          Registrar
        </Button>
        <Button className='ms-2' variant="primary" onClick={()=>navigate('/login')}>
          Cancelar
        </Button>
      </Form>
    </Col>
  </Row>
  )
}
