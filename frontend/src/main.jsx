import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './assets/css/index.scss'
import App from './App.jsx'

const element = document.getElementById('root');
const container = createRoot(element);
container.render(
    <StrictMode>
        <App/>
    </StrictMode>,
);
