import { AppHeader } from './AppHeader';
import { AppMain } from './AppMain';
import { StickerTypeProvider } from '../../context';

import './App.scss';

function App() {
    return (
        <div className='app'>
            <div className='app__wrapper'>
                <AppHeader />
                <div className='app__divider'></div>
                <StickerTypeProvider>
                    <AppMain />
                </StickerTypeProvider>
            </div>
        </div>
    );
}

export default App;
