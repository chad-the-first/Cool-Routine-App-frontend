import styles from "../styles/Routine.module.css";
import { Card } from "react-bootstrap";
import { Routine as RoutineModel } from "../models/routine";
import { formatDate } from "../utils/formatDate";

interface Props {
  routine: RoutineModel;
  className?: string;
}

const Routine = ({ routine, className }: Props) => {
  const { title, text, createdAt, updatedAt } = routine;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card className={`${styles.routineCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Routine;
