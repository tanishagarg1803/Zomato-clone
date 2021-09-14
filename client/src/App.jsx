// import HOC 
import HomeLayoutHOC from "./HOC/Home.Hoc";

//components
import Temp from "./Components/temp";
import HomeLayout from "./Layout/Home.layout";

function App() {
  return (
    <>
      <HomeLayoutHOC path="/" exact component={Temp} />
    </>
  );
}

export default App;
