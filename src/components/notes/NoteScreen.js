import React from 'react';
import { NotesAppBar } from './NotesAppBar';
// cd
export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content" >
                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                />
                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                ></textarea>
                <div className="notes__image" >
                    <img 
                        alt="note"
                        src="https://st.depositphotos.com/1679308/1622/i/600/depositphotos_16225575-stock-photo-landscape-of-croatian-nature.jpg"
                    />
                </div>
            </div>
        </div>
    );
};
