import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const [films, setFilms]= useState([])
  const [next, setNext] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    axios
            .get("http://93.93.117.48/api/films")
            .then((res)=>{
              console.log(res);
              setFilms(res.data.films)
              setNext(res.data.nextPage)
            })

            .catch((error)=>{
              console.log(error);
            })
  }, [])

  const nextPag = ()=>{
    axios
      .get(next)
      .then((res)=>{
        console.log(res);
        setFilms([...films, ...res.data.films])
        setNext(res.data.nextPage)
      })

    .catch((error)=>{
      console.log(error);
    })
  }
  
  return (
    <>
    <h1 className='text-center'>PIXAR</h1>
    
    <div className='d-flex justify-content-center gap-2 flex-wrap'>
      {films.map((elem) =>{
         return(
            <img onClick={()=>navigate(`/oneFilm/${elem.film_id}`)} src={elem.film_image} key={elem.film_id} alt="" style={{ cursor: "pointer" }} />
          )
        })
      }
    </div>
    {next &&
      <Button variant='outline' className='w-100 h-100 fs-1' onClick={nextPag}> ⬇ </Button> 
    }
    </>
  )
}
