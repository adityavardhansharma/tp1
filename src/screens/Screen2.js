// screens/Screen2.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Screen2 = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate processing time
        const processingTimeout = setTimeout(() => {
            // Redirect to result screen after processing
            navigate('/result');
        }, 3000);

        return () => clearTimeout(processingTimeout);
    }, [navigate]);

    return (
        <div>
            {/* Top Bar */}
            <div className="top-bar">CERTIFICATE UPLOADER</div>

            {/* Processing Screen */}
            <div className="processing-screen">Processing...</div>
        </div>
    );
};

export default Screen2;
