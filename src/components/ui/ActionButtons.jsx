import React, { useState } from 'react';
import feedIcon from '../../assets/feed.png';
import petIcon from '../../assets/hand.png';
import playIcon from '../../assets/Egg.png'; // asegúrate que esté en minúsculas
import feedFrame from '../../assets/FrameSecondary.png';
import petFrame from '../../assets/FrameSecondary.png';
import playFrame from '../../assets/FrameSecondary.png';


function ActionButtons({ setPetStats, onAction }) {
  const [animatingButton, setAnimatingButton] = useState(null);

  const handleAction = (actionType) => {
    setAnimatingButton(actionType);
    
    // Actualizar estadísticas
    setPetStats(prevStats => {
      const newStats = { ...prevStats };
      
      switch (actionType) {
        case 'feed':
          newStats.hunger = Math.min(100, prevStats.hunger + 15);
          break;
        case 'pet':
          newStats.happiness = Math.min(100, prevStats.happiness + 15);
          break;
        case 'play':
          newStats.health = Math.min(100, prevStats.health + 15);
          // Jugar también reduce un poco el hambre
          newStats.hunger = Math.max(0, prevStats.hunger - 5);
          break;
      }
      
      return newStats;
    });

    // Callback para animación de la mascota si existe
    if (onAction) onAction(actionType);

    // Resetear animación después de 300ms
    setTimeout(() => {
      setAnimatingButton(null);
    }, 300);
  };

  const actions = [
    {
      type: 'feed',
      icon: feedIcon,
      frame: feedFrame,
      text: 'FEED',
      color: '#D2B48C' 
    },
    {
      type: 'pet',
      icon: petIcon,
      frame: petFrame,
      text: 'PET',
      color: '#DDA0DD' 
    },
    {
      type: 'play',
      icon: playIcon,
      frame: playFrame,
      text: 'PLAY',
      color: '#98FB98'
    }
  ];

  return (
    <div 
      className="d-flex justify-content-center"
      style={{ 
        gap: '1px',
        marginTop: '10px'
      }}
    >
      {actions.map((action) => (
        <div
          key={action.type}
          onClick={() => handleAction(action.type)}
          style={{
            position: 'relative',
            cursor: 'pointer',
            transform: animatingButton === action.type ? 'scale(0.95)' : 'scale(1)',
            transition: 'transform 0.1s ease',
            userSelect: 'none'
          }}
        >
          {/* Frame de fondo */}
          <img
            src={action.frame}
            alt={`${action.text} frame`}
            style={{
              width: '230px',
              height: '230px',
              imageRendering: 'pixelated'
            }}
          />
          
          {/* Contenido del botón superpuesto */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none'
            }}
          >
            {/* Icono */}
            <img
              src={action.icon}
              alt={`${action.text} icon`}
              style={{
                width: '80px',
                height: '100px',
                imageRendering: 'pixelated',
                marginBottom: '2px'
              }}
            />
            
            {/* Texto */}
            <span
              style={{
                fontFamily: '"Pixelify Sans", monospace',
                fontSize: '30px',
                fontWeight: 'bold',
                color: '#a585caff',
                textAlign: 'center',
                lineHeight: '1'
              }}
            >
              {action.text}
            </span>
          </div>

          {/* Efecto de click - partículas */}
          {animatingButton === action.type && (
            <>
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '15px',
                  width: '4px',
                  height: '4px',
                  backgroundColor: action.color,
                  borderRadius: '50%',
                  animation: 'particle1 0.3s ease-out forwards'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '25px',
                  right: '15px',
                  width: '3px',
                  height: '3px',
                  backgroundColor: action.color,
                  borderRadius: '50%',
                  animation: 'particle2 0.3s ease-out forwards'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  width: '2px',
                  height: '2px',
                  backgroundColor: action.color,
                  borderRadius: '50%',
                  animation: 'particle3 0.3s ease-out forwards'
                }}
              />
            </>
          )}
        </div>
      ))}

      {/* CSS para las animaciones de partículas */}
      <style jsx>{`
        @keyframes particle1 {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-10px, -15px) scale(1.5);
          }
        }
        
        @keyframes particle2 {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(12px, -12px) scale(1.2);
          }
        }
        
        @keyframes particle3 {
          0% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, 10px) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
}

export default ActionButtons;