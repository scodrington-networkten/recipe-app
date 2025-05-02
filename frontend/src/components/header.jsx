import logo from '@image-assets/chef-claude-icon.png';
import {useContext} from "react";
import {UserContext} from "@components/UserContext.jsx";
import '@css/header.scss';
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {

    const { user } = useContext(UserContext);

    return (
        <>
            <header className="container header">
                <div className="inner">
                    <div className="logo-section">
                        <img src={logo} alt="Fancy Recipes"/>
                        <h1>Fancy Recipes</h1>
                    </div>
                    <div className="user-section">
                        <div className="user-details">
                            <span className="name">{user.name}</span>
                            <span className="email">{user.email}</span>
                        </div>
                        <FontAwesomeIcon className="icon" icon={['fas', 'user']} />
                    </div>
                </div>
            </header>
        </>
    )
};
export default Header
