import "../App.css";
import "./Navbar.css"

function App({content}) {
  return (
    <nav>
      {content.map((item) => (
        <a href={item.path} >{item.icon ? <i className={item.icon}></i>: item.name}</a>
      ))}
  </nav>
  );
}

export default App;

