import { useEffect, useState } from "react";
import { Routine as RoutineModel } from "./models/routine";
import Routine from "./components/Routine";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/RoutinesPage.module.css";

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
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {routines.map((routine) => (
          <Col key={routine._id}>
            <Routine routine={routine} className={styles.routine} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
