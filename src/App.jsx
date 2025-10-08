import { useState, useEffect } from "react";
import { PixelNavbar, PixelFooter, Frame } from "./components"; 
import "./styles/App.css"; 


function App() {
  const [allPetStats, setAllPetStats] = useState({
    fox: { hunger: 80, happiness: 60, health: 90 },
    unicorn: { hunger: 75, happiness: 85, health: 70 },
    panda: { hunger: 90, happiness: 95, health: 85 },
    pom: { hunger: 70, happiness: 50, health: 80 },
    totoro: { hunger: 85, happiness: 75, health: 65 },
  });

  const [currentPet, setCurrentPet] = useState("fox");

  const setPetStats = (newStats) => {
    if (typeof newStats === "function") {
      setAllPetStats((prevAllStats) => ({
        ...prevAllStats,
        [currentPet]: newStats(prevAllStats[currentPet]),
      }));
    } else {
      setAllPetStats((prevAllStats) => ({
        ...prevAllStats,
        [currentPet]: newStats,
      }));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAllPetStats((prevAllStats) => {
        const newAllStats = { ...prevAllStats };
        Object.keys(newAllStats).forEach((petType) => {
          newAllStats[petType] = {
            hunger: Math.max(0, newAllStats[petType].hunger - 1),
            happiness: Math.max(0, newAllStats[petType].happiness - 1),
            health: Math.max(0, newAllStats[petType].health - 1),
          };
        });
        return newAllStats;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: "#FFF2DC", minHeight: "100vh" }}>
      <PixelNavbar />

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: 'calc(100vh - 160px)', 
          paddingTop: '2rem',    
          paddingBottom: '2rem', 
        }}
      >
        <Frame
          petStats={allPetStats[currentPet]}
          setPetStats={setPetStats}
          currentPet={currentPet}
          onPetChange={setCurrentPet}
          allPetStats={allPetStats}
        />
      </div>

      <PixelFooter />
    </div>
  );
}

export default App;
