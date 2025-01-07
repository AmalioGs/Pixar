import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const OneFilm = () => {
  const { id } = useParams();
  const [film, setFilm] = useState({});
  const [characters, setCharacters] = useState();
  // const [char, setChar] = useState({})
  console.log("FILMMMMMMMMMMMMM", film);

  /*   useEffect(() => {
    axios
            .get(`http://93.93.117.48/api/films/${id}`)
            .then((res)=>{
              console.log("********************",res);
              setFilm(res.data)
            })

            .catch((error)=>{
              console.log(error);
            })
  }, []) */
  /* Al final lo he planteado con el useEffect, pero vamos que se puede hacer igual que antes, desde un botón, que cuando se pulse dicho botón se carguen los personajes */
  useEffect(() => {
    const fetchFilmAndCharacters = async () => {
      try {
        // Obtener datos de la película
        const res = await axios.get(
          `http://93.93.117.48/api/films/${id}`
        );
        const filmData = res.data;

        setFilm(filmData);

        /* Array para almacenar todos los personajes */
        const characterData = [];
        /* Bucle para iterar por todos los personajes */
        for (const url of filmData.charaters) {
          const response = await axios.get(url);
          characterData.push(response.data);
        }

        /* Mostramos el array de personajes y seteamos el estado characters */
        console.log("Personajes obtenidos:", characterData);
        setCharacters(characterData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFilmAndCharacters();
  }, []);

  // const onSubmit = () =>{
  //   axios
  //   .get(`http://93.93.117.48/api/characters/${id}`)
  //   .then((res)=>{
  //     console.log(res);
  //     setChar([...char])
  //   })

  //   .catch((error)=>{
  //     console.log(error);
  //   })
  // }

  return (
    <>
      <h1 className="text-center">
        FICHA TÉCNICA DE {film.title?.toUpperCase()}
      </h1>
      {/*     <Button variant='outline' onClick={onSubmit}>
      Personajes: 
    </Button> */}
      <div>
        <img src={film.film_image} alt="" />
      </div>
      <div>
        <strong>Título:</strong> {film.title} ({film.original_title}){" "}
      </div>
      <div>
        <strong>Director:</strong> {film.director}
      </div>
      <div>
        <strong>Género:</strong> {film.genre}
      </div>
      <div>
        <strong>Sinopsis:</strong> {film.argument}
      </div>
      {/* Mostramos los personajes iterando el estado characters, que es un estado que ha sido rellenado con todos los personajes de cada película, le he dado unos estilos en línea, pero lo suyo sería meterlo en un CSS*/}
      <div className="fs-3 text-center">Personajes que aparecen en la película:</div>
      <div className="d-flex flex-wrap justify-content-center">
        {characters?.map((character, index) => (
          <>
            <img
              src={character.character_image}
              alt={character.name}
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          </>
        ))}
      </div>
    </>
  );
};
