import { SelectStickerType } from '../SelectStickerType/SelectStickerType';

function AppMain() {
    return (
        <main className='app__main'>
            <section className='app__section'>
                <h2 className='app__section-title'>Select sticker type</h2>
                <SelectStickerType />
            </section>
            <div className='app__divider'></div>
            <section className='app__section'>
                <h2 className='app__section-title'>Select files</h2>
            </section>
        </main>
    );
}

export { AppMain };
