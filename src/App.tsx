import { Container } from "react-bootstrap";
import styles from "./styles/RoutinesPage.module.css";
import NavBar from "./components/NavBar";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignUpModal";
import { useState, useEffect } from "react";
import { User } from "./models/user";
import * as RoutineApi from "./network/routine_api";
import RoutinesPageLoggeInView from "./components/RoutinesPageLoggedInView";
import RoutinesPageLoggedOutView from "./components/RoutinesPageLoggedOutView";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await RoutineApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onlogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container className={styles.routinesPage}></Container>
      <>
        {loggedInUser ? (
          <RoutinesPageLoggeInView />
        ) : (
          <RoutinesPageLoggedOutView />
        )}
      </>
      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </>
  );
}

export default App;
