import Layout from "../components/Layout";
import { UserProvider } from "../components/UserProvider";

function Home() {
  const user = {
    name: "Omari",
    email: "yRj1W@example.com",
    age: "35 ans"
  };

  return (
    <UserProvider user={user}>
      <Layout />
    </UserProvider>
  );
}

export default Home;
