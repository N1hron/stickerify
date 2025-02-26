import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/app/App';

import './main.scss';

const rootNode = document.getElementById('root')!;
const root = createRoot(rootNode);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
