import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  // Your Firebase configuration
};

const App = () => {
  const [file, setFile] = useState(null);
  const [textData, setTextData] = useState(null);
  const [storage, setStorage] = useState(null);

  useEffect(() => {
    setStorage(getStorage(initializeApp(firebaseConfig)));
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select an image to upload.');
      return;
    }

    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);

    const imageUrl = `https://text-parsing-416106.appspot.com/images/${file.name}`;

    // Additional logic for handling the uploaded image (if needed)

    // Update the state or perform any other necessary actions
  };

  const TopHeadingBar = () => {
    const headingBarStyle = {
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)',
      backgroundColor: '#03045E',
      color: '#90E0EF',
      padding: '10px',
      textAlign: 'center',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: '20px',
      position: 'fixed',
      width: '96%',
      top: '20px',
      zIndex: '1',
      borderRadius: '50px',
    };

    const headingStyle = {
      margin: '0',
    };

    return (
        <div style={headingBarStyle}>
          <h1 style={headingStyle}>CERTIFICATE UPLOADER</h1>
        </div>
    );
  };

  const uploadButtonBoxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    width: '50%',
    height: '50%',
  };

  const buttonStyle = {
    backgroundColor: '#00B4D8',
    padding: '20px',
    borderRadius: '15px',
    cursor: 'pointer',
    margin: '10px 0',
    border: `2px solid #03045E`,
    color: '#03045E',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '60%',
  };

  const fileNameStyle = {
    color: '#03045E', // Dark Blue
    marginTop: '10px', // Added margin to separate file name and button
  };

  return (
      <div
          style={{
            backgroundColor: '#90E0EF',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0077B6',
          }}
      >
        {/* Render the TopHeadingBar component */}
        <TopHeadingBar />

        <div style={uploadButtonBoxStyle}>
          <label
              htmlFor="fileInput"
              style={{
                ...buttonStyle,
                marginBottom: '0',
              }}
          >
            Choose File
          </label>
          <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: 'none' }} />
          {file && <div style={fileNameStyle}>{file.name}</div>}
          <button onClick={handleUpload} style={buttonStyle}>
            Upload Image
          </button>
        </div>
      </div>
  );
};

export default App;
