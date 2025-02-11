import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App/App.tsx';

import './styles/index.scss';

const rootNode = document.getElementById('root')!;

createRoot(rootNode).render(
    <StrictMode>
        <App />
    </StrictMode>
);
