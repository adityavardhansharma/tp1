// screens/Screen3.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../api/firebase';

const Screen3 = () => {
    const navigate = useNavigate();
    const [uploadedImage, setUploadedImage] = useState(null);
    const [extractedText, setExtractedText] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch the most recent document from the 'texts' collection
            const querySnapshot = await getDocs(collection(db, 'texts'));
            const latestDocument = querySnapshot.docs[querySnapshot.docs.length - 1];

            // Get the extracted text
            const data = latestDocument.data();
            setExtractedText(data);
        };

        fetchData();
    }, []);

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div>
            {/* Top Bar */}
            <div className="top-bar">CERTIFICATE UPLOADER</div>

            {/* Result Screen */}
            <div className="result-screen">
                {extractedText && (
                    <div>
                        <img src={uploadedImage} alt="Uploaded" />
                        <p>User Name: {extractedText.userName}</p>
                        <p>Certificate Name: {extractedText.certificateName}</p>
                        <p>Issue Date: {extractedText.issueDate}</p>
                    </div>
                )}
                <button onClick={handleGoBack}>Go Back</button>
            </div>
        </div>
    );
};

export default Screen3;
