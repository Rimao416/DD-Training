
import Layout from "../components/Layout";
import { UserProvider } from "../components/UserProvider";
import useCounter from "../hooks/useCounter";

function Home() {
const {count,increment,decrement,reset}=useCounter();


  return (
    <>
    <h1>Bienvenue dans mon application</h1>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
    <button onClick={reset}>reset</button>
    <p>{count}</p>
    </>
  );
}

export default Home;
