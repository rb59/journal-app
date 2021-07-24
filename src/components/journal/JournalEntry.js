import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { activeNote } from '../../actions/notes';
export const JournalEntry = ({ id, title, body, date, url }) => {
    const { active } = useSelector((state) => state.notes);
    const dispatch = useDispatch();
    const noteDate = DateTime.fromMillis(date).toLocal();
    const handleSelectEntry = () => {
        const note = {
            title,
            body,
            date,
            url,
        };
        dispatch(activeNote(id, note));
    };
    return (
        <div
            className={`journal__entry ${
                active?.id === id ? 'selected' : ''
            } animate__animated animate__fadeIn animate__faster`}
            onClick={handleSelectEntry}
        >
            {url && (
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundImage: `url(${url})`,
                        backgroundSize: 'cover',
                    }}
                ></div>
            )}
            <div className="journal__entry-body">
                <p className="journal__entry-title">{title}</p>
                <p className="journal__entry-content">{body}</p>
            </div>
            <div className="journal__entry-date-box">
                <span>{noteDate.toFormat('cccc')}</span>
                <h4>{noteDate.toFormat('dd')}</h4>
            </div>
        </div>
    );
};
