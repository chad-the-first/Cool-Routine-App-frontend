import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Routine as RoutineModel } from "../models/routine";
import * as RoutinesApi from "../network/routine_api";
import stylesUtils from "../styles/utils.module.css";
import AddRoutineDialog from "./AddEditRoutineDialog";
import Routine from "./Routine";
import styles from "../styles/RoutinesPage.module.css";
import Calendar from "react-calendar";
import "../styles/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const RoutinesPageLoggeInView = () => {
  const [routines, setRoutines] = useState<RoutineModel[]>([]);
  const [routinesLoading, setRoutinesLoading] = useState(true);
  const [showRoutinesLoadingError, setShowRoutinesLoadingError] =
    useState(false);
  const [day, setDay] = useState<Value>(new Date());
  const [showAddRoutineDialog, setShowAddRoutineDIalog] = useState(false);
  const [routineToEdit, setRoutineToEdit] = useState<RoutineModel | null>(null);

  useEffect(() => {
    async function loadRoutines() {
      try {
        setShowRoutinesLoadingError(false);
        setRoutinesLoading(true);
        const routines = await RoutinesApi.fetchRoutines();
        setRoutines(routines);
      } catch (error) {
        console.log(error);
        setShowRoutinesLoadingError(true);
      } finally {
        setRoutinesLoading(false);
      }
    }
    loadRoutines();
  }, []);

  useEffect(() => {
    const dayShort = String(day).slice(0, 10);
    routines.map((routine) => {
      if (routine.date === dayShort) {
        console.log(dayShort);
        setRoutineToEdit(routine);
      } else {
        console.log(dayShort);
        setShowAddRoutineDIalog(true);
      }
    });
  }, [day]);

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

  const routinesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.routinesGrid}`}>
      {routines.map((routine) => {
        return (
          <Col key={routine._id}>
            <Routine
              onDeleteRoutineClicked={deleteRoutine}
              onRoutineClicked={setRoutineToEdit}
              routine={routine}
              className={styles.routine}
            />
          </Col>
        );
      })}
    </Row>
  );

  return (
    <>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setShowAddRoutineDIalog(true)}
      >
        <FaPlus />
        Add new routine
      </Button>
      {routinesLoading && <Spinner animation="border" variant="primary" />}
      {showRoutinesLoadingError && (
        <p>Something went wrong Please refresh the page!</p>
      )}
      {!routinesLoading && !showRoutinesLoadingError && (
        <>
          {routines.length > 0 ? (
            routinesGrid
          ) : (
            <p>You don't have any notes yet</p>
          )}
        </>
      )}

      <Calendar onChange={setDay} value={day} />

      {showAddRoutineDialog && (
        <AddRoutineDialog
          value={String(day)}
          onDismiss={() => setShowAddRoutineDIalog(false)}
          onRoutineSaved={(newRoutine) => {
            setRoutines([...routines, newRoutine]);
            setShowAddRoutineDIalog(false);
          }}
        />
      )}
      {routineToEdit && (
        <AddRoutineDialog
          value={String(day)}
          routineToEdit={routineToEdit}
          onDismiss={() => setRoutineToEdit(null)}
          onRoutineSaved={(updatedRoutine) => {
            setRoutines(
              routines.map((existingRoutine) =>
                existingRoutine._id === updatedRoutine._id
                  ? updatedRoutine
                  : existingRoutine
              )
            );
            setRoutineToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default RoutinesPageLoggeInView;
