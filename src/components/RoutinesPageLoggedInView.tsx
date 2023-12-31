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
import Chart from "./Chart";

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

  const dayShort = String(day).slice(0, 15);
  useEffect(() => {
    for (let i = 0; i < routines.length; i++) {
      if (dayShort == routines[i].date) {
        setRoutineToEdit(routines[i]);
        break;
      } else if (i === routines.length - 1) {
        setShowAddRoutineDIalog(true);
        break;
      }
    }
  }, [day]);

  async function deleteRoutine(routine: RoutineModel) {
    try {
      await RoutinesApi.deletRoutine(routine._id);
      setRoutines(
        routines.filter(
          (existingRoutine) => existingRoutine._id !== routine._id
        )
      );
      setRoutineToEdit(null);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  const routinesGrid = (
    <Row xs={3} xl={6} className={`g-2 ${styles.routinesGrid}`}>
      {routines
        .sort((a, b) =>
          parseInt(a.date.slice(8)) > parseInt(b.date.slice(8)) ? 1 : -1
        )
        .map((routine) => {
          if (
            routine.date.slice(4, 7) + routine.date.slice(10) ===
            dayShort.slice(4, 7) + dayShort.slice(10)
          ) {
            return (
              <Col className="mt-5" key={routine._id}>
                <Routine
                  onDeleteRoutineClicked={deleteRoutine}
                  onRoutineClicked={setRoutineToEdit}
                  routine={routine}
                  className={styles.routine}
                />
              </Col>
            );
          }
        })}
    </Row>
  );

  return (
    <>
      {routines.length === 0 && (
        <Button
          className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
          onClick={() => setShowAddRoutineDIalog(true)}
        >
          <FaPlus />
          Rate your day
        </Button>
      )}
      {routinesLoading && <Spinner animation="border" variant="primary" />}
      {showRoutinesLoadingError && (
        <p>Something went wrong Please refresh the page!</p>
      )}
      {!routinesLoading && !showRoutinesLoadingError && (
        <>
          <Chart routines={routines} date={dayShort} />

          {routines.length > 0 ? (
            routinesGrid
          ) : (
            <p>You don't have any notes yet</p>
          )}
        </>
      )}

      <Calendar className="mt-5" onChange={setDay} value={day} />

      {showAddRoutineDialog && (
        <AddRoutineDialog
          value={String(day)}
          onDeleteRoutineClicked={deleteRoutine}
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
          onDeleteRoutineClicked={deleteRoutine}
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
