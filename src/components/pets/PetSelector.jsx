import React, { useState } from 'react';
import foxImage from '../../assets/Fox.png';
import unicornImage from '../../assets/unicorn.png';
import pandaImage from '../../assets/panda.png';
import pomImage from '../../assets/pom.png';
import totoroImage from '../../assets/totoro.png';


function PetSelector({ selectedPet, onPetChange, allPetStats }) {
  const [animatingPet, setAnimatingPet] = useState(null);

  const pets = [
    { id: 'fox', name: 'FOX', image: foxImage },
    { id: 'unicorn', name: 'UNICORN', image: unicornImage },
    { id: 'panda', name: 'PANDA', image: pandaImage },
    { id: 'pom', name: 'POM', image: pomImage },
    { id: 'totoro', name: 'TOTORO', image: totoroImage }
  ];

  // Función para calcular el estado general de una mascota
  const getPetOverallStatus = (petStats) => {
    if (!petStats) return 'unknown';
    
    const avgHealth = (petStats.hunger + petStats.happiness + petStats.health) / 3;
    const lowest = Math.min(petStats.hunger, petStats.happiness, petStats.health);
    
    // Estado crítico si alguna stat está muy baja
    if (lowest <= 20) return 'critical';
    // Estado de alerta si el promedio está bajo o alguna stat está baja
    if (avgHealth <= 40 || lowest <= 35) return 'warning';
    // Estado bueno
    if (avgHealth >= 70) return 'good';
    // Estado normal
    return 'normal';
  };

  // Función para obtener el color y emoji del estado
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'critical':
        return { color: '#ff4444', text: 'CRITICAL!' };
      case 'warning':
        return { color: '#ff8800', text: 'NEEDS CARE' };
      case 'normal':
        return { color: '#ffaa00', text: 'OK' };
      case 'good':
        return { color: '#44aa44', text: 'HAPPY' };
      default:
        return { color: '#666666', text: '???' };
    }
  };

  const handlePetSelect = (petId) => {
    if (petId !== selectedPet) {
      setAnimatingPet(petId);
      onPetChange(petId);
      
      // Resetear animación después de 200ms
      setTimeout(() => {
        setAnimatingPet(null);
      }, 200);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: '-150px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        zIndex: 15
      }}
    >
      {pets.map((pet) => {
        const petStats = allPetStats?.[pet.id];
        const status = getPetOverallStatus(petStats);
        const statusDisplay = getStatusDisplay(status);
        
        return (
          <div
            key={pet.id}
            onClick={() => handlePetSelect(pet.id)}
            style={{
              position: 'relative',
              cursor: 'pointer',
              width: '160px',
              height: '140px',
              backgroundColor: selectedPet === pet.id ? '#e6d3ff' : '#f8f8f8',
              border: selectedPet === pet.id ? '3px solid #9b71c8' : '2px solid #ddd',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: animatingPet === pet.id ? 'scale(0.95)' : 
                        selectedPet === pet.id ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.2s ease',
              boxShadow: selectedPet === pet.id ? 
                '0 4px 12px rgba(155, 113, 200, 0.3)' : 
                status === 'critical' ? '0 2px 8px rgba(255, 68, 68, 0.4)' :
                status === 'warning' ? '0 2px 8px rgba(255, 136, 0, 0.3)' :
                '0 2px 6px rgba(0,0,0,0.1)',
              userSelect: 'none'
            }}
          >
            {/* Imagen de la mascota */}
            <img
              src={pet.image}
              alt={`${pet.name} pet`}
              style={{
                width: '80px',
                height: '80px',
                imageRendering: 'pixelated',
                marginBottom: '3px',
                opacity: selectedPet === pet.id ? 1 : 0.8,
                transition: 'opacity 0.2s ease'
              }}
            />
            
            {/* Nombre de la mascota */}
            <span
              style={{
                fontFamily: '"Pixelify Sans", monospace',
                fontSize: '10px',
                fontWeight: 'bold',
                color: selectedPet === pet.id ? '#9b71c8' : '#666',
                textAlign: 'center',
                transition: 'color 0.2s ease',
                marginBottom: '2px'
              }}
            >
              {pet.name}
            </span>

            {/* Indicador de estado */}
            <div
              style={{
                fontSize: '15px',
                fontWeight: 'bold',
                color: statusDisplay.color,
                textAlign: 'center',
                fontFamily: '"Pixelify Sans", monospace',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}
            >
              <span style={{ fontSize: '10px' }}>{statusDisplay.emoji}</span>
              <span>{status === 'good' ? 'HAPPY' : status === 'normal' ? 'OK' : status === 'warning' ? 'CARE' : 'SOS!'}</span>
            </div>

            {/* Indicador de estado urgente (parpadeo para crítico) */}
            {status === 'critical' && (
              <div
                style={{
                  position: 'absolute',
                  top: '-3px',
                  left: '-3px',
                  width: '30px',
                  height: '30px',
                  backgroundColor: '#ff4444',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: 'white',
                  fontWeight: 'bold',
                  animation: 'pulse 1s infinite',
                  zIndex: 10
                }}
              >
                !
              </div>
            )}

            {/* Indicador de selección */}
            {selectedPet === pet.id && (
              <div
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#9b71c8',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                ✓
              </div>
            )}

            {/* Efecto hover */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '10px',
                backgroundColor: 'transparent',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (selectedPet !== pet.id) {
                  e.target.style.backgroundColor = 'rgba(155, 113, 200, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            />
          </div>
        );
      })}

      {/* Título del selector */}
      <div
        style={{
          marginTop: '10px',
          textAlign: 'center',
          fontFamily: '"Pixelify Sans", monospace',
          fontSize: '30px',
          fontWeight: 'bold',
          color: '#9b71c8',
          letterSpacing: '1px'
        }}
      >
        PETS
      </div>

      {/* CSS para animaciones */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default PetSelector;