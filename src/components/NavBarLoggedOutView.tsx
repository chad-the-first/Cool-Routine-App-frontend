import { Button } from "react-bootstrap";

interface props {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked }: props) => {
  return (
    <>
      <Button className="mx-2" variant="dark" onClick={onSignUpClicked}>
        Sign Up
      </Button>
      <Button variant="info" onClick={onLoginClicked}>
        Log In
      </Button>
    </>
  );
};

export default NavBarLoggedOutView;
