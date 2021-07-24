import { DateTime } from 'luxon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    startDeleting,
    startSaveNote,
    startUploadPicture,
} from '../../actions/notes';
// cd
export const NotesAppBar = () => {
    const { active } = useSelector((state) => state.notes);
    const dispatch = useDispatch();
    const date = DateTime.now().toLocaleString(DateTime.DATE_FULL);
    const handleAddPicture = () => {
        document.querySelector('#fileSelector').click();
    };
    const handleSave = () => {
        dispatch(startSaveNote(active));
    };
    const handleDelete = () => {
        dispatch(startDeleting(active.id));
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(startUploadPicture(file));
        }
    };

    return (
        <div className="notes__appbar">
            <span>{date}</span>
            <input
                id="fileSelector"
                name="file"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div>
                <button className="btn" onClick={handleAddPicture}>
                    Picture
                </button>
                <button className="btn" onClick={handleSave}>
                    Save
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};
