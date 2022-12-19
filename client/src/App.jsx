import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

function App({content}) {

  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <div className="App">      
      <Navbar pages={pages} />
    </div>
  );
}

export default App;
