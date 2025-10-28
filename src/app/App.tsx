import { userService } from "../entities/users/service/service";

function App() {
  const user = userService.getAllUsers();
  console.log(user);
  return <div>sdfsdfdsf</div>;
}

export default App;
