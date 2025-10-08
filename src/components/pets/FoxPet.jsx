import React, { useState, useEffect } from 'react';
import foxImage from '../../assets/Fox.png';


function FoxPet({ petStats, onInteract, triggerAnimation, actionType }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const [mood, setMood] = useState('happy');

  // Determinar el estado del zorro según las estadísticas
  useEffect(() => {
    const avgHealth = (petStats.hunger + petStats.happiness + petStats.health) / 3;
    
    if (avgHealth >= 80) setMood('happy');
    else if (avgHealth >= 50) setMood('normal');
    else setMood('sad');
  }, [petStats]);

  // Animación de idle (respiración suave)
  useEffect(() => {
    const idleAnimation = setInterval(() => {
      if (currentAnimation === 'idle') {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    }, 4000);

    return () => clearInterval(idleAnimation);
  }, [currentAnimation]);

  // Activar animación desde fuera (cuando se presiona algún botón)
  useEffect(() => {
    if (triggerAnimation) {
      setCurrentAnimation('bounce');
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentAnimation('idle');
        setIsAnimating(false);
      }, 500);
    }
  }, [triggerAnimation]);

  // Función para obtener los efectos según la acción
  const getActionEffects = () => {
    switch (actionType) {
      case 'feed':
        return {
          particles: ['🍕', 'ñam!', '🍎'],
          colors: ['#FFD700', '#FF4500', '#32CD32'],
          text: 'Yummy!'
        };
      case 'play':
        return {
          particles: ['⚽', 'Fun!', '🎾'],
          colors: ['#00BFFF', '#9370DB', '#FF6347'],
          text: 'Playful!'
        };
      case 'pet':
      default:
        return {
          particles: ['♥', '♥', '♥'],
          colors: ['#FF69B4', '#FFB6C1', '#FFC0CB'],
          text: 'Happy!'
        };
    }
  };

  // Manejar click en el zorro
  const handleFoxClick = () => {
    setCurrentAnimation('bounce');
    setIsAnimating(true);
    
    if (onInteract) onInteract();

    setTimeout(() => {
      setCurrentAnimation('idle');
      setIsAnimating(false);
    }, 500);
  };

  // Filtros CSS según el mood
  const getMoodFilter = () => {
    switch (mood) {
      case 'happy':
        return 'brightness(1.1) contrast(1.05) saturate(1.2)';
      case 'normal':
        return 'brightness(1) contrast(1) saturate(1)';
      case 'sad':
        return 'brightness(0.8) contrast(0.9) saturate(0.7)';
      default:
        return 'brightness(1) contrast(1) saturate(1)';
    }
  };

  return (
    <div
      onClick={handleFoxClick}
      style={{
        cursor: 'pointer',
        transform: `scale(${isAnimating && currentAnimation === 'bounce' ? '1.05' : '1'}) 
                   translateY(${isAnimating && currentAnimation === 'idle' ? '-2px' : '0'})`,
        transition: 'transform 0.3s ease',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* Imagen del zorro */}
      <img
        src={foxImage}
        alt="White Fox"
        style={{
          width: '400px',
          height: '400px',
          imageRendering: 'pixelated', 
          filter: getMoodFilter(),
          transition: 'filter 0.5s ease'
        }}
      />

      {/* Efectos de partículas cuando se hace click o acción */}
      {isAnimating && currentAnimation === 'bounce' && (
        <>
          {getActionEffects().particles.map((particle, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: index === 0 ? '-60px' : index === 1 ? '460px' : '200px',
                top: index === 0 ? '100px' : index === 1 ? '80px' : '-40px',
                fontSize: actionType === 'feed' || actionType === 'play' ? '32px' : '36px',
                color: getActionEffects().colors[index],
                animation: `floatUp 1.5s ease-out forwards`,
                animationDelay: `${index * 0.3}s`,
                fontWeight: 'bold',
                fontFamily: '"Pixelify Sans", monospace', 
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                zIndex: 100
              }}
            >
              {particle}
            </div>
          ))}
        </>
      )}

      {/* Estado de ánimo */}
      <div
        style={{
          marginTop: '1px',
          fontFamily: '"Pixelify Sans", monospace',
          fontSize: '20px',
          color: '#666',
          textAlign: 'center',
          opacity: isAnimating && currentAnimation === 'bounce' ? '0' : '1',
          transition: 'opacity 0.3s ease'
        }}
      >
        {mood === 'happy' && 'Happy!'}
        {mood === 'normal' && 'Okay'}
        {mood === 'sad' && 'Needs care...'}
      </div>

      {/* CSS para animaciones */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}

export default FoxPet;