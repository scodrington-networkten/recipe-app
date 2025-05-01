import {useState} from 'react'
import './assets/css/index.scss'
import logo from '@assets/images/react.svg'
import Header from '@components/header';
import Footer from "@components/footer.jsx";
import Main from "@components/Main.jsx";
import {UserProvider} from "@components/UserContext.jsx";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faCamera, faUser, faCake} from "@fortawesome/free-solid-svg-icons";
library.add(faCamera, faUser, faCake);

function App() {
    //const [count, setCount] = useState(0)

    return (
        <>
            <UserProvider>
                <div className="main">
                    <Header/>
                    <Main/>
                    <Footer/>
                </div>
            </UserProvider>
        </>
    )
}

export default App
