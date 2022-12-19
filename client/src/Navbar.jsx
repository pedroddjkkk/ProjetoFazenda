import "./App.css";
import { useEffect } from "react";

function App({content}) {

  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <nav>
      {content.map((item) => (
        <a class=""  href={item.path} >{item.name}</a>
      ))}
  </nav>
  );
}

export default App;

