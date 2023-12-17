import menu from "../assets/images/menu.svg";
import SearchBar from './SearchBar.jsx';
import Button from "./Button.jsx";
import { isDesktop, isMobileOnly } from 'react-device-detect';
import flowWhite from "../assets/images/flow_white.svg";

export default function Header() {
    return (
        <header>
            {isMobileOnly && (
                <>
                    <img className='menu' src={menu} alt="Menu deroulant" />
                    <img className='logo-resp' src={flowWhite} alt="Logo de l'application" />
                    <SearchBar />
                </>

            )}

            {isDesktop && (
                <>
                    <img className='logo' src={flowWhite} alt="Logo de l'application" />
                    <SearchBar />
                    <div className="authentification">
                        <Button content='Se connecter' link='login' />
                        <Button content="S'incrire" link='register' className='pink' />
                    </div>

                </>
            )}

        </header>
    );
}