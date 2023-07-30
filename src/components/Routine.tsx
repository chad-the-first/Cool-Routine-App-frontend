import styles from "../styles/Routine.module.css";
import stylesUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Routine as RoutineModel } from "../models/routine";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface Props {
  routine: RoutineModel;
  className?: string;
  onDeleteRoutineClicked: (routine: RoutineModel) => void;
  onRoutineClicked: (routine: RoutineModel) => void;
}

const Routine = ({
  routine,
  className,
  onDeleteRoutineClicked,
  onRoutineClicked,
}: Props) => {
  const { title, text, createdAt, updatedAt } = routine;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card
      onClick={() => onRoutineClicked(routine)}
      className={`${styles.routineCard} ${className}`}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={stylesUtils.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e: { stopPropagation: () => void }) => {
              onDeleteRoutineClicked(routine);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Routine;
