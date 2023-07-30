import { useEffect, useState } from "react";
import { Routine as RoutineModel } from "./models/routine";
import Routine from "./components/Routine";

function App() {
  const [routines, setRoutines] = useState<RoutineModel[]>([]);

  useEffect(() => {
    async function loadRoutines() {
      try {
        const response = await fetch("/api/routines", {
          method: "GET",
        });
        const routines = await response.json();
        setRoutines(routines);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
    loadRoutines();
  }, []);

  return (
    <div>
      {routines.map((routine) => (
        <Routine routine={routine} key={routine._id} />
      ))}
    </div>
  );
}

export default App;
