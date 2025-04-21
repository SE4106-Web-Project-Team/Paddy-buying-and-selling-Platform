import React from 'react';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Welcome to the Paddy Buying and Selling Platform</h1>
            <p>Your one-stop solution for buying and selling paddy efficiently.</p>
            <button 
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                onClick={() => alert('Explore our platform!')}
            >
                Get Started
            </button>
        </div>
    );
};

export default Home;