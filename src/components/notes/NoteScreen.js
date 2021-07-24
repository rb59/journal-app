import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';
// cd
export const NoteScreen = () => {
    const dispatch = useDispatch();
    const { active } = useSelector((state) => state.notes);
    const [values, handleInputChange, reset] = useForm(active);
    const { title, body } = values;
    const activeId = useRef(active.id);

    useEffect(() => {
        if (activeId.current !== active.id) {
            reset(active);
            activeId.current = active.id;
        }
    }, [active, reset]);

    useEffect(() => {
        dispatch(activeNote(values.id, { ...values }));
    }, [values, dispatch]);

    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <input
                    type="text"
                    name="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea
                    name="body"
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>
                {active.url && (
                    <div className="notes__image mt-1">
                        <img alt="note" src={active.url} />
                    </div>
                )}
            </div>
        </div>
    );
};
