import {ServicesApi} from "../API/getCharacters";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import arrowBack from '../assets/arrow_back_24px.svg'
import "./charInfo.scss"
import ErrorMessage from "../errorsBlock/ErrorBox";


const CharInfo = () => {
    const navigate = useNavigate()

    const {charId}= useParams();
    const [char,setChar]=useState([]);
    const {getCharactersById , error} = ServicesApi()

    useEffect(()=> {
        getCharacters()
    },[charId])

    const getCharacters = () => {
        getCharactersById(charId).then(onCharList)
    }

    const onCharList = (list) => {
        setChar(list)
    }

    const {name ,image, gender,status , origin , type , species} = char

    const renderDescription = [
        {
            title: 'Gender',
            information: gender
        },
        {
            title: 'Status',
            information: status
        },
        {
            title: 'Species',
            information: species
        },
        {
            title: 'Origin',
            information: origin
        },
        {
            title: 'Type',
            information: type|| 'Unknown'
        },
    ]

    return (
        <div className='charInfo__container'>
            <div>
                <button  className='logOut_btn' onClick={()=> navigate('/login')}>Exit</button>
            </div>
            <Link to={'/'} style={{textDecoration: 'none'}}>
                <div className='charInfo__container_navigation'>
                    <img src={arrowBack} />
                    <span className='charInfo__navigation_title'>GO BACK</span>
                </div>
            </Link>
            {error ? <ErrorMessage errorMessage={"Error Server..."}/> : (
                <>
                    <div className='charInfo__wrapper_photo'>
                        <img src={image} className='charInfo__wrapper_image'/>
                        <h2 className='charInfo__wrapper_name'>{name}</h2>
                    </div>
                    <div className='charInfo__wrapper'>
                        <p className='charInfo__wrapper_information'>Informations</p>
                        {renderDescription.map(({title,information})=> (
                            <div className='charInfo__wrapper_description'>
                                <h3 className='charInfo__wrapper_title'>{title}</h3>
                                <p className='charInfo__wrapper_text'>{information}</p>
                                <hr className='charInfo__wrapper_border'/>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default CharInfo
