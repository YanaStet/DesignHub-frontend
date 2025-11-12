import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { UserHooks } from "../entities/users/hooks";

function App() {
  const { data: user } = UserHooks.useGetAllUserQuery();
  console.log(user);
  return (
    <div>
      {user?.map((user, i) => {
        return (
          // <div key={i}>
          //   <p>{user.firstName}</p>
          //   <p>{user.email}</p>
          // </div>
          <div key={i}>
            <Typography variant="h2">{user.firstName}</Typography>
            <Typography variant="body1">{user.email}</Typography>
          </div>
        );
      })}
    </div>
  );
}

export default App;
