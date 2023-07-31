import { Button } from "react-bootstrap";

interface props {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked }: props) => {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign Up</Button>
      <Button onClick={onLoginClicked}>Log In</Button>
    </>
  );
};

export default NavBarLoggedOutView;
