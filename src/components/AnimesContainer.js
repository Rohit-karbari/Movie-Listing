import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ShowAnimeData from './ShowAnimeData'

const AnimesContainer = () => {
  const [anime,setAnime] = useState([])
  const [bool,setBool] = useState(false)
  useEffect(()=>{
      axios.get('https://api.jikan.moe/v4/anime')
            .then((response)=>{
                const result = [...anime,{...response.data}]
                console.log("result", result)
                setAnime(result[0].data)
            })
            .catch((error)=>{
                console.log(error.message)
            })
  },[])

  const filteredData = (data)=>{
        // console.log("filtereddata",anime)
        const res = anime.filter((ele)=>{
            return ele.title.toLowerCase().includes(data.toLowerCase())
        })
        // setAnime(res)
        return res;
  }
  const showDataBasedOnGeneres = (data,uniqueVal)=>{
      const arr = []
    const uniqueGeneres =  anime.map((ele,i)=>{
        return(
                ele.genres.map((gen)=>{
                   if(gen.name.toLowerCase() === data.toLowerCase()){
                        arr.push(ele)
                   }
                })
        )
      })  
      console.log("arr",arr)
      return arr;
  }

  return (
    <div>
        {
            anime.length !== 0 &&
        <ShowAnimeData data={anime} filteredData={filteredData} showDataBasedOnGeneres={showDataBasedOnGeneres}/>
        }
    </div>
  )
}

export default AnimesContainer