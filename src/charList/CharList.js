import React, {useEffect, useState} from "react";
import {ServicesApi} from "../API/getCharacters";
import PropTypes from 'prop-types';
import logoImage from '../assets/pageLogoType.jpeg'
import './charList.scss'
import {Link, useNavigate} from "react-router-dom";
import ErrorMessage from "../errorsBlock/ErrorBox";

const CharList = (props) => {
    const navigate = useNavigate()
    const [charList , setCharList] = useState([])
    const [searchText,setSearchText] = useState('')

    const {getCharacters ,error} = ServicesApi()


    useEffect(()=> {
        getRequest()
    },[])

    useEffect(() => {
        const savedSearchText = localStorage.getItem("searchText");
        const authOk = localStorage.getItem('Login')
        if (savedSearchText) {
            setSearchText(savedSearchText);
        }
        if (authOk) return navigate("/");

    }, []);

    useEffect(() => {
        localStorage.setItem("searchText", searchText);
    }, [searchText]);

    const getRequest = ()=> {
        getCharacters().then(onCharList)
    }
    const onCharList = (list) => {
        setCharList(list)
    }

    const filteredNames = charList.filter((character) =>  character.name.toLowerCase().includes(searchText.toLowerCase()))
        .sort((a,b) => a.name.localeCompare(b.name))

    const renderCharactersList = () => {
        if(filteredNames.length === 0 ) return <ErrorMessage errorMessage={'Characters not found...'}/>

        return (
            filteredNames.map((item)=> (
                    <Link to={`/characters/${item.id}`}>
                        <div className='charList__container_imageBox' onClick={()=> props.onSelectedCard(item.id)}>
                            <img src={item.image} className='charList__container_image'/>
                            <div className='charList__container_descriptionBox'>
                                <h3 className='charList__container_image_name'>{item.name}</h3>
                                <p className='charList__container_image_species'>{item.species}</p>
                            </div>
                        </div>
                    </Link>
                ))
        )
    }
    return (
        <div className='charList'>
                <div>
                    <button  className='logOut_btn' onClick={()=> navigate('/login')}>Exit</button>
                </div>
            <img src={logoImage} className='charList__imgLogo'/>
           <div className='charList__container'>
               <div className="charList__container_input">
                   <input
                       value={searchText}
                       onChange={(event) => setSearchText(event.target.value)}
                       placeholder='Filter by name...'
                       className='charList__container_filterInput'/>
               </div>
               {error ? <ErrorMessage errorMessage={'Error Server...'}/> : (
                   <div className='charList__container_list'>
                        {renderCharactersList()}
                   </div>
                   )}
           </div>
        </div>
    )
}

CharList.propTypes={
    onSelectedCard:PropTypes.func.isRequired
}
export default CharList
