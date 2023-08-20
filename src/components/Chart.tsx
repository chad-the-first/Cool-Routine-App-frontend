import { Col, ProgressBar } from "react-bootstrap";
import { Routine } from "../models/routine";

interface props {
  routines: Routine[];
  date: string;
}
const chart = ({ routines, date }: props) => {
  let Fun = 0;
  let Knowledge = 0;
  let Work = 0;
  let Service = 0;
  let Self_care = 0;
  let Family = 0;

  const thisMonthRoutines: Array<Routine> = [];

  routines.map((routine) => {
    if (
      routine.date.slice(4, 7) + routine.date.slice(10) ===
      date.slice(4, 7) + date.slice(10)
    ) {
      thisMonthRoutines.push(routine);
    }
  });

  for (let i = 0; i < thisMonthRoutines.length; i++) {
    Fun += parseInt(thisMonthRoutines[i].fun);
    Knowledge += parseInt(thisMonthRoutines[i].knowledge);
    Work += parseInt(thisMonthRoutines[i].work);
    Service += parseInt(thisMonthRoutines[i].service);
    Self_care += parseInt(thisMonthRoutines[i].self_care);
    Family += parseInt(thisMonthRoutines[i].family);
  }

  Fun = Math.round(Fun / thisMonthRoutines.length);
  Knowledge = Math.round(Knowledge / thisMonthRoutines.length);
  Work = Math.round(Work / thisMonthRoutines.length);
  Service = Math.round(Service / thisMonthRoutines.length);
  Self_care = Math.round(Self_care / thisMonthRoutines.length);
  Family = Math.round(Family / thisMonthRoutines.length);

  return (
    <>
      <Col xs={5}>
        <h2 className="text-center">This month scores:</h2>
        <ProgressBar variant="warning" now={Fun} />
        <ProgressBar variant="info" now={Knowledge} />
        <ProgressBar variant="dark" now={Work} />
        <ProgressBar variant="primary" now={Service} />
        <ProgressBar variant="success" now={Self_care} />
        <ProgressBar variant="danger" now={Family} />
      </Col>

      {routines && Fun < 20 && <p>*Go out and have some fun!</p>}
      {routines && Knowledge < 20 && <p>*Come on, read something!</p>}
      {routines && Work < 20 && <p>*You need to find something to do!</p>}
      {routines && Service < 20 && <p>*Take more care of your soul!</p>}
      {routines && Self_care < 20 && (
        <p>*why don't you buy yourself somehting nice?</p>
      )}
      {routines && Family < 20 && (
        <p>*You're family probably misses you, give them a call!</p>
      )}
    </>
  );
};

export default chart;
