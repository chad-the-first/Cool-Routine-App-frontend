import { useEffect, useState } from "react";
import { Routine as RoutineModel } from "./models/routine";
import Routine from "./components/Routine";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/RoutinesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as RoutinesApi from "./network/routine_api";
import AddRoutineDialog from "./components/AddRoutineDialog";

function App() {
  const [routines, setRoutines] = useState<RoutineModel[]>([]);
  const [showAddRoutineDialog, setShowAddRoutineDIalog] = useState(false);

  useEffect(() => {
    async function loadRoutines() {
      try {
        const routines = await RoutinesApi.fetchRoutines();
        setRoutines(routines);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
    loadRoutines();
  }, []);

  async function deleteRoutine(routine: RoutineModel) {
    try {
      await RoutinesApi.deletRoutine(routine._id);
      setRoutines(
        routines.filter(
          (existingRoutine) => existingRoutine._id !== routine._id
        )
      );
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Container>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter}`}
        onClick={() => setShowAddRoutineDIalog(true)}
      >
        Add new routine
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {routines.map((routine) => (
          <Col key={routine._id}>
            <Routine
              onDeleteRoutineClicked={deleteRoutine}
              routine={routine}
              className={styles.routine}
            />
          </Col>
        ))}
      </Row>
      {showAddRoutineDialog && (
        <AddRoutineDialog
          onDismiss={() => setShowAddRoutineDIalog(false)}
          onRoutineSaved={(newRoutine) => {
            setRoutines([...routines, newRoutine]);
            setShowAddRoutineDIalog(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
