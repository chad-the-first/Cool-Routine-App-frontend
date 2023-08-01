import { Container } from "react-bootstrap";
import styles from "../styles/RoutinesPage.module.css";

import RoutinesPageLoggeInView from "../components/RoutinesPageLoggedInView";
import RoutinesPageLoggedOutView from "../components/RoutinesPageLoggedOutView";
import { User } from "../models/user";

interface props {
  loggedInUser: User | null;
}

const RoutinesPage = ({ loggedInUser }: props) => {
  return (
    <Container className={styles.routinesPage}>
      <>
        {loggedInUser ? (
          <RoutinesPageLoggeInView />
        ) : (
          <RoutinesPageLoggedOutView />
        )}
      </>
    </Container>
  );
};

export default RoutinesPage;
