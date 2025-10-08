import React, { useState } from 'react';
import frameImage from '../../assets/FrameMain.png'; 
import Needs from '../pets/Needs';
import GenericPet from '../pets/GenericPet';
import ActionButtons from '../ui/ActionButtons';
import PetSelector from '../pets/PetSelector';


function Frame({ petStats, setPetStats, currentPet, onPetChange, allPetStats }) {
  const [petAnimationTrigger, setPetAnimationTrigger] = useState(0);
  const [lastActionType, setLastActionType] = useState('pet');
  const [selectedPet, setSelectedPet] = useState(currentPet || 'fox'); // Estado para la mascota seleccionada

  // Función para manejar acciones y activar animaciones
  const handlePetAction = (actionType) => {
    setLastActionType(actionType);
    setPetAnimationTrigger(prev => prev + 1);
  };

  // Función para cuando se hace click directo en la mascota
  const handleDirectPetClick = () => {
    setLastActionType('pet');
    setPetStats(prevStats => ({
      ...prevStats,
      happiness: Math.min(100, prevStats.happiness + 5)
    }));
  };

  // Función para cambiar de mascota
  const handlePetChange = (newPetType) => {
    setSelectedPet(newPetType);
    if (onPetChange) onPetChange(newPetType); 
    setPetAnimationTrigger(prev => prev + 1);
    setLastActionType('pet');
  };

  return (
    <div className="position-relative d-flex justify-content-center align-items-center">
      <img
        src={frameImage}
        alt="A decorative frame for the virtual pet"
        className="img-fluid"
      />
      
      {/* Selector de mascotas */}
      <PetSelector 
        selectedPet={selectedPet}
        onPetChange={handlePetChange}
        allPetStats={allPetStats}
      />
      
      {/* Barras de necesidades */}
      <div 
        className="position-absolute d-flex justify-content-center w-100"
        style={{
          top: '20px', 
          left: '0',
          right: '0',
          zIndex: 10
        }}
      >
        <Needs petStats={petStats} />
      </div>

      {/* Mascota genérica con animaciones específicas */}
      <div 
        className="position-absolute d-flex justify-content-center w-100"
        style={{
          top: '50%',
          left: '0',
          right: '0',
          transform: 'translateY(-50%)',
          zIndex: 5
        }}
      >
        <GenericPet 
          petType={selectedPet}
          petStats={petStats} 
          onInteract={handleDirectPetClick}
          triggerAnimation={petAnimationTrigger}
          actionType={lastActionType}
        />
      </div>

      {/* Botones de acción */}
      <div 
        className="position-absolute d-flex justify-content-center w-100"
        style={{
          bottom: '50px',
          left: '0',
          right: '0',
          zIndex: 10
        }}
      >
        <ActionButtons setPetStats={setPetStats} onAction={handlePetAction} />
      </div>
    </div>
  );
}

export default Frame;