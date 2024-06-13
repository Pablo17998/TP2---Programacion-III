import React from 'react';
import Body from './cmp/Body';
import Header from './cmp/Header';
import './App.css';

function App() {
    return (
        <div style={mainDiv}>
            <Header />
            <Body />
        </div>
    );
}

const mainDiv = {
    padding: '0 150px',
};

export default App;
