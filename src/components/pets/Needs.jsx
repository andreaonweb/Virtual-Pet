import React from 'react';
import hungerIcon from '../../assets/Food.png';
import happinessIcon from '../../assets/Happiness.png';
import healthIcon from '../../assets/Heart.png';


function Needs({ petStats }) {
  const getBarColor = (type) => {
    if (type === 'health') return '#FF6B6B';
    if (type === 'happiness') return '#FFD93D';
    if (type === 'hunger') return '#6BCF7F';
    return '#4A4A4A';
  };

  const needs = [
    { name: 'HUNGER', icon: hungerIcon, value: petStats.hunger || 80, type: 'hunger' },
    { name: 'HAPPINESS', icon: happinessIcon, value: petStats.happiness || 60, type: 'happiness' },
    { name: 'HEALTH', icon: healthIcon, value: petStats.health || 90, type: 'health' }
  ];

  return (
    <div 
      className="p-4 d-flex flex-column align-items-center"
      style={{ 
        fontFamily: '"Pixelify Sans", monospace',
        fontSize: '40px',
        fontWeight: 'bold',
        color: '#9b71c8ff',
        width: '100%',
        maxWidth: '500px'
      }}
    >
      {needs.map((need, index) => (
        <div key={need.name} className={`d-flex align-items-center ${index < needs.length - 1 ? 'mb-3' : ''}`}>
          {/* Icono */}
          <img 
            src={need.icon} 
            alt={`${need.name} icon`}
            className="me-3"
            style={{ width: '65px', height: '65px' }}
          />
          
          {/* Texto */}
          <span className="me-1" style={{ width: '300px' }}>
            {need.name}
          </span>
          
              {/* Barra de progreso */}
              <div
                  className="position-relative flex-grow-1"
                  style={{
                      height: '28px',
                      backgroundColor: '#ffffffff',
                      border: '1px solid #ffffffff',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      width: '300px',
                  }}
              >
                  <div
                      style={{
                          height: '100%',           
                          width: `${need.value}%`,
                          backgroundColor: getBarColor(need.type),
                          transition: 'width 0.3s ease'
                      }}
                  ></div>
              </div>
        </div>
      ))}
    </div>
  );
}

export default Needs;
