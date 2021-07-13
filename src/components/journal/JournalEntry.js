import React from 'react';

export const JournalEntry = () => {
    return (
        <div className="journal__entry">
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundImage: 'url(https://st.depositphotos.com/1679308/1622/i/600/depositphotos_16225575-stock-photo-landscape-of-croatian-nature.jpg)',
                    backgroundSize: 'cover',
                }}
            ></div>
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo día
                </p>
                <p className="journal__entry-content">
                    Adipisicing quis reprehenderit ad pariatur labore exercitation consequat Lorem deserunt.
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>13</h4>
            </div> 
        </div>
    );
};
