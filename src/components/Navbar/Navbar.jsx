import "../../App.css";
import "../../assets/bootstrap/css/bootstrap.min.css"

function Navbar({content}) {
  return (
    <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
    <div class="container-fluid d-flex flex-column p-0"><a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
            <div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-tractor"></i></div>
            <div class="sidebar-brand-text mx-3"><span>Agro</span></div>
        </a>
        <hr class="sidebar-divider my-0" />
        <ul id="accordionSidebar" class="navbar-nav text-light">
          {content.map((item) => {
            if(item.navigable) return <li className="nav-item"><a className="nav-link" href={item.path} ><i className={"fas " + item.icon}></i><span>{item.name}</span></a></li>
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;