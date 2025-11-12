import { UserHooks } from "../entities/users/hooks";

function App() {
  const { data: user } = UserHooks.useGetAllUserQuery();
  console.log(user);
  return (
    <div>
      {user?.map((user, i) => {
        return (
          <div key={i}>
            <p className="text-red-500">{user.firstName}</p>
            <p>{user.email}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
