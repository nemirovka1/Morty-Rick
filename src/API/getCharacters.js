import {useCallback, useState} from "react";
import axios from "axios";

export const ServicesApi = () => {
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)

    const getCharacters = useCallback(async ()=> {
        setLoading(true)
        try{
            const result = await axios.get('https://rickandmortyapi.com/api/character')
            setLoading(false)
            return result.data.results.map(_transformCharacters)
        }catch (e) {
            setError(true)
            throw e;
        }
    },[])

    const getCharactersById = useCallback(async (id) => {
        setLoading(true)
        try {
            const result = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            setLoading(false)
            return _transformCharacters(result.data)
        }
        catch (e) {
            setError(true)
            throw e;
         }
     },[])


    const _transformCharacters = (data) => {
         return{
             id: data.id,
             gender:data.gender,
             image:data.image,
             name:data.name,
             species:data.species,
             status:data.status,
             origin:data.name,
             type:data.type,
         }
    }

  return {getCharacters , getCharactersById , loading , error }
}
