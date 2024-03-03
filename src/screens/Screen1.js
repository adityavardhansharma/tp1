// screens/Screen1.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use 'useNavigate' instead of 'useHistory'
import { storage, firestore } from '../api/firebase';
import { processImage } from '../api/googleVision';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const Screen1 = () => {
    const navigate = useNavigate(); // Use 'useNavigate'
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        // Upload to Firebase Storage
        const fileRef = storage.ref(`images/${selectedFile.name}`);
        await fileRef.put(selectedFile);

        // Initiate Google Vision API
        const extractedText = await processImage(selectedFile);

        // Save extracted text to Firestore Database
        const docData = {
            text: extractedText,
            uploadedAt: serverTimestamp(),
        };
        await addDoc(collection(firestore, 'texts'), docData);

        // Redirect to processing screen
        navigate('/processing');
    };

    return (
        <div>
            {/* Top Bar */}
            <div className="top-bar">CERTIFICATE UPLOADER</div>

            {/* Square Box Component */}
            <div className="square-box">
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default Screen1;
