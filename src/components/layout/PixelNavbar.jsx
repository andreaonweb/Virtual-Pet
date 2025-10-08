import React from 'react';

const PixelNavbar = () => {
  return (
    <div className="pixel-navbar-wrapper d-flex justify-content-center align-items-center py-2">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;600&display=swap');

          .pixel-navbar-wrapper {
            background-color: #FFF2DC; 
            border-bottom: 3px solid #b8a3e5; 
            box-shadow: 0 2px #d3c0f3; 
            font-family: 'Pixelify Sans', monospace;
            width: 100%;
          }

          .pixel-navbar {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 4rem;
          }

          .pixel-link {
            color: #7d5bbd;
            text-decoration: none;
            font-size: 1.5rem;
            letter-spacing: 1px;
            padding: 8px 8px;
            transition: all 0.15s ease-in-out;
          }

          .pixel-link:hover {
            color: #a482e0;
            text-shadow: 0 0 2px #cbb8f7;
            transform: translateY(-1px);
          }

          .pixel-link:active {
            color: #5e3a80;
            transform: translateY(1px);
          }
        `}
      </style>

      <nav className="pixel-navbar">
        <a href="/pets" className="pixel-link">SHOP</a>
        <a href="/shop" className="pixel-link">PETS</a>
        <a href="/games" className="pixel-link">GAMES</a>
      </nav>
    </div>
  );
};

export default PixelNavbar;
