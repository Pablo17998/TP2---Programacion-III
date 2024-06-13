import React from 'react';

const Header = () => {
    return (
        <div style={headerStyle}>
            <h1 style={h1Style}><i>APP DE CLIMA</i></h1>
        </div>
        /*<header style={headerStyle}>
            
        </header>*/
    );
};

const headerStyle = {
    background: 'rgba(63, 181, 255, .3)',
    color: '#222',
    textAlign: 'center',
    fontFamily: 'cursive',
    borderRadius: '100px'
};

const h1Style = {
    fontSize: '50px',
}

export default Header;
