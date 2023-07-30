import styles from "../styles/Routine.module.css";
import { Card } from "react-bootstrap";
import { Routine as RoutineModel } from "../models/routine";

interface Props {
  routine: RoutineModel;
}

const Routine = ({ routine }: Props) => {
  const { title, text, createdAt, updatedAt } = routine;

  return (
    <Card className={styles.routineCard}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
        <Card.Text className={styles.cardText}>
          {createdAt}
          {updatedAt}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Routine;
