import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

export const OneFilm = () => {
  const {id} = useParams()
  const [film, setFilm] = useState({})
  // const [char, setChar] = useState({})
  console.log("FILMMMMMMMMMMMMM", film);

  useEffect(() => {
    axios
            .get(`http://93.93.117.48/api/films/${id}`)
            .then((res)=>{
              console.log("********************",res);
              setFilm(res.data)
            })

            .catch((error)=>{
              console.log(error);
            })
  }, [])

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
    <h1 className='text-center'>FICHA TÉCNICA DE {film.title?.toUpperCase()}</h1>
{/*     <Button variant='outline' onClick={onSubmit}>
      Personajes: 
    </Button> */}
    <div><img src={film.film_image} alt="" /></div>
    <div><strong>Título:</strong> {film.title} ({film.original_title}) </div>
    <div><strong>Director:</strong> {film.director}</div>
    <div><strong>Género:</strong> {film.genre}</div>
    <div><strong>Sinopsis:</strong> {film.argument}</div>

    </>
  )
}
