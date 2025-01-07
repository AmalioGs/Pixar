import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../../Helpers/axiosHelper.js";
import { PixarContext } from "../../../context/ContextProvider.jsx";

const initialValue = {
  user_email: "",
  user_password: "",
};

export const Login = () => {
  const [login, setLogin] = useState(initialValue);
  const [msg, setMsg] = useState("");
  const {setUser, setToken} = useContext(PixarContext)

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const onSubmit = async() => {
    try {
      const result = await fetchData("user/login", "post", login)
      const token = result.data
      localStorage.setItem("token", token)

      const resultUser = await fetchData("user/findUserById", "get", null, {authorization: `bearer ${token}`})
      navigate('/home')
      setUser(resultUser.data);
      setToken(token);

    } catch (error) {
      setMsg(error.response?.data?.message);
      
    }
  };
  console.log(login);
  
  return (
    <Row className="d-flex justify-content-center">
      <Col md={5} lg={4}>
        <Form>
          <h2>Iniciar sesión</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Introduce el email"
              value={login.user_email}
              onChange={handleChange}
              name="user_email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={login.user_password}
              onChange={handleChange}
              name="user_password"
            />
          </Form.Group>

          <p style={{ color: "red" }}>{msg}</p>
          <Button variant="primary" onClick={onSubmit}>
            Iniciar sesión
          </Button>

          <Button
            className="ms-2"
            variant="success"
            onClick={() => navigate("/register")}
          >
            Crear cuenta
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
