import React from 'react';
import '../Styling/Component/Toggle.css'; // Assuming Toggle.css is in the same directory

export default function Toggle({ showToggle }) {
    return (
        <div className={`toggleContainer ${showToggle ? 'visible' : ''}`}>
            {showToggle && (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </div>
    );
}
