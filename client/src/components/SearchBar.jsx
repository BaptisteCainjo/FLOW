import React from 'react';
import search from "../assets/images/search.svg"
import arrowDownGrey from "../assets/images/arrow_down_grey.svg"
import { isDesktop } from 'react-device-detect';

export default function SearchBar() {
    return (
        <>
            <div className={`${isDesktop ? 'search-bar' : 'search-bar-resp'}`}><img src={search} alt="Icône d'une loupe recherche" /> <input type="text" placeholder="Rechercher" /><img src={arrowDownGrey} alt="Icône d'une flèche vers le bas" /></div >
        </>
    );
}