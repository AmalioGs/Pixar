import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchData } from "../../../Helpers/axiosHelper.js";

export const OneFilm = () => {
  const { id } = useParams();
  const [film, setFilm] = useState({});
  const [characters, setCharacters] = useState();
  console.log("FILMMMMMMMMMMMMM", film);

  useEffect(() => {
    const fetchFilmAndCharacters = async () => {
      try {
        // Obtener datos de la película
        const res = await axios.get(`http://93.93.117.48/api/films/${id}`);
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

  const addFavFilm = async () =>{
    try {
      await fetchData("user/favFilm", "post", film)
      
    } catch (error) {
      console.log(error);
      
    }
    
  }

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
      <div onClick={addFavFilm} className="fs-1">
        ⭐
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
      <div className="fs-3 text-center">
        Personajes que aparecen en la película:
      </div>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {characters?.map((character, index) => (
            <img
              src={character.character_image}
              key={index}
              alt={character.name}
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
        ))}
      </div>
    </>
  );
};
