import { useEffect, useState } from "react";
import { Routine } from "./models/routine";

function App() {
  const [routines, setRoutines] = useState<Routine[]>([]);

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

  return <div className="App">{JSON.stringify(routines)}</div>;
}

export default App;
