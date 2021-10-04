// import HOC 
import HomeLayoutHOC from "./HOC/Home.Hoc";

//components
import Temp from "./Components/temp";
import HomeLayout from "./Layout/Home.layout";
import Master from "./Components/master";

function App() {
  return (
    <>
      <HomeLayoutHOC path="/" exact component={Temp} />
      <HomeLayoutHOC path="/:type" exact component={Master} />
    </>
  );
}

export default App;
