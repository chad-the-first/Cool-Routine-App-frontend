import { Col, ProgressBar } from "react-bootstrap";
import { Routine } from "../models/routine";

interface props {
  routines: Routine[];
}
const chart = ({ routines }: props) => {
  let Fun = 0;
  let Knowledge = 0;
  let Work = 0;
  let Service = 0;
  let Self_care = 0;
  let Family = 0;

  for (let i = 0; i < routines.length; i++) {
    Fun += parseInt(routines[i].fun);
    Knowledge += parseInt(routines[i].knowledge);
    Work += parseInt(routines[i].work);
    Service += parseInt(routines[i].service);
    Self_care += parseInt(routines[i].self_care);
    Family += parseInt(routines[i].family);
  }

  Fun = Math.round(Fun / routines.length);
  Knowledge = Math.round(Knowledge / routines.length);
  Work = Math.round(Work / routines.length);
  Service = Math.round(Service / routines.length);
  Self_care = Math.round(Self_care / routines.length);
  Family = Math.round(Family / routines.length);

  return (
    <Col xs={5}>
      <h2 className="text-center">This month scores:</h2>
      <ProgressBar variant="success" now={Fun} />
      <ProgressBar variant="info" now={Knowledge} />
      <ProgressBar variant="warning" now={Work} />
      <ProgressBar variant="danger" now={Service} />
      <ProgressBar variant="success" now={Self_care} />
      <ProgressBar variant="info" now={Family} />
    </Col>
  );
};

export default chart;
