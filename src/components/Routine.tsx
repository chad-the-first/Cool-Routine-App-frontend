import { ProgressBar } from "react-bootstrap";
import { Routine as RoutineModel } from "../models/routine";

interface Props {
  routine: RoutineModel;
  className?: string;
  onDeleteRoutineClicked: (routine: RoutineModel) => void;
  onRoutineClicked: (routine: RoutineModel) => void;
}

const Routine = ({ routine }: Props) => {
  const { fun, knowledge, work, service, self_care, family, date } = routine;

  return (
    <div>
      <h5 className="text-center">{date.slice(0, 10)}</h5>
      <ProgressBar variant="warning" now={parseInt(fun)} />
      <ProgressBar variant="info" now={parseInt(knowledge)} />
      <ProgressBar variant="dark" now={parseInt(work)} />
      <ProgressBar variant="primary" now={parseInt(service)} />
      <ProgressBar variant="success" now={parseInt(self_care)} />
      <ProgressBar variant="danger" now={parseInt(family)} />
    </div>
  );
};

export default Routine;
