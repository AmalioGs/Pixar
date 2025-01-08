import { useContext, useEffect, useState } from 'react'
import { PixarContext } from '../../context/ContextProvider'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { fetchData } from '../../Helpers/axiosHelper.js'


const initialValue = {
  user_name: "",
  user_lastname: "",
  user_address: "",
  user_phone: "",
  user_birthdate: "",
  user_description: ""
}

export const EditUser = () => {
  const {user, setUser} = useContext(PixarContext);
  const [edit, setEdit] = useState(initialValue);
  const [file, setFile] = useState();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      setEdit(user)
    }
  }, [user])

  const handleChange = (e) =>{
    const {name, value} = e.target
    setEdit({...edit, [name]: value})
  }
  
  const handleFile = (e) =>{
    setFile(e.target.files[0]); 
  }
   

  const onSubmit = async () =>{
    try {
      if(!edit.user_name || !edit.user_lastname || !edit.user_address || !edit.user_birthdate || !edit.user_phone || !edit.user_description ){
        setMsg("No debe de haber ningún campo vacío")
      }
      else{
        const newFormData = new FormData();
        newFormData.append("edit", JSON.stringify(edit));
        newFormData.append("file", file);

        const res = await fetchData("user/editUser", "put", newFormData);
        
        setUser({...edit, user_avatar:res.data.img})
        
        navigate('/profile')
        /* window.location.reload() */

      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <Row className="d-flex justify-content-center">
    <Col md={5} lg={3}>
      <Form className="registro">
       <h2>Formulario edición</h2>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
           type="text"
           placeholder="Introduce nombre"
           name='user_name'
           value={edit.user_name?edit.user_name:""}
           onChange={handleChange}
         />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastname">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
           type="text"
           placeholder="Introduce apellidos"
           name='user_lastname'
           value={edit.user_lastname?edit.user_lastname:""}
           onChange={handleChange}
           />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
           type="text"
           placeholder="Dirección"
           name='user_address'
           value={edit.user_address?edit.user_address:""}
           onChange={handleChange}
           />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
           type="text"
           placeholder="Teléfono"
           name='user_phone'
           value={edit.user_phone?edit.user_phone:""}
           onChange={handleChange}
           />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBirthDate">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control
           type="date"
           name='user_birthdate'
           value={edit.user_birthdate?edit.user_birthdate:""}
           onChange={handleChange}
           />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Cuéntanos algo sobre ti</Form.Label>
          <Form.Control
           type="text"
           name='user_description'
           value={edit.user_description?edit.user_description:""}
           onChange={handleChange}
           />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAvatar">
          <Form.Label>Imagen de perfil</Form.Label>
          <Form.Control
           type="file"
           onChange={handleFile}
           />
        </Form.Group>
        <p style={{color:"red"}}>{msg}</p>
        <Button
         onClick={onSubmit}
         variant="success">
          Aceptar
        </Button>
        <Button
          className="ms-2"
          variant="danger"
          onClick={()=>navigate("/profile")}
        >
          Cancelar
        </Button>
      </Form>
    </Col>
  </Row>
  )
}
