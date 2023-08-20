import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as RoutineApi from "../network/routine_api";

interface props {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavBarLoggedinView = ({ user, onLogoutSuccessful }: props) => {
  async function logout() {
    try {
      await RoutineApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <>
      <Navbar.Text className="me-2">Signed in as: {user.username}</Navbar.Text>
      <Button variant="secondary" onClick={logout}>
        Log out
      </Button>
    </>
  );
};

export default NavBarLoggedinView;
