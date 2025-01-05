import axios from 'axios'

const pixarUrl = import.meta.env.VITE_SERVER_URL;

//Siempre que vayamos a hacer una llamada axios tengo que hacer una llamada a fetchData, por lo que sustituye el axios.post/.get/.etc por esta llamada

export const fetchData = async (url, method, data = null, headers = {}) =>{ //Ponemos data en null porque los métodos get no reciben nada y en headers un objeto vacío porque a veces no queremos mandar headers, mande un objeto vacío y no de error (autorizaciones por ejemplo)
  try {
    const config = {
      method, //Esto es .post o .get
      url: pixarUrl+url, //Lo que está dentro de .env + la url que le demos
      headers,
      data //Los datos del usuario
    }
    const response = await axios(config)
    return response
    
  } catch (error) {
    throw error
  }
}