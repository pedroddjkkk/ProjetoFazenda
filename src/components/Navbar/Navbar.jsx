import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import "../../App.css";
import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/styles.min.css";
import { changeUser } from "../../redux/actions/userSlice";

function Navbar({ pages }) {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/";
    } else {
      const userObj = JSON.parse(user);
      dispatch(changeUser(userObj));
    }
  }, []);

  return (
    <div id="page-top">
      <div id="wrapper">
        <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
          <div class="container-fluid d-flex flex-column p-0">
            <a
              class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
              href="#"
            >
              <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-tractor"></i>
              </div>
              <div class="sidebar-brand-text mx-3">
                <span>Agro</span>
              </div>
            </a>
            <hr class="sidebar-divider my-0" />
            <ul id="accordionSidebar" class="navbar-nav text-light">
              {pages[0].children.map((item, index) => {
                if (item.navigable)
                  return (
                    <li className="nav-item">
                      <NavLink className="nav-link" key={index} to={item.path}>
                        <i className={"fas " + item.icon}></i>
                        <span>{item.name}</span>
                      </NavLink>
                    </li>
                  );
              })}
            </ul>
          </div>
        </nav>
        <div class="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <nav class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
              <div class="container-fluid">
                <button
                  class="btn btn-link d-md-none rounded-circle me-3"
                  id="sidebarToggleTop"
                  type="button"
                >
                  <i class="fas fa-bars"></i>
                </button>
                <form class="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div class="input-gro up"></div>
                </form>
                <div className="column" style={{textAlign: "center"}}>
                  <span class="text-gray-600 small">
                    {selectedUser && selectedUser.nome}
                  </span>
                  <NavLink
                    className="nav-link"
                    to="/"
                    onClick={() => {
                      localStorage.removeItem("user");
                      dispatch(changeUser(null));
                    }}
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Sair</span>
                  </NavLink>
                </div>
              </div>
            </nav>
            <div class="container-fluid">
              <Outlet />
            </div>
          </div>
          <footer class="bg-white sticky-footer">
            <div class="container my-auto">
              <div class="text-center my-auto copyright">
                <span>Copyright © 2023</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <script src="../../assets/js/script.min" />
    </div>
  );
}

export default Navbar;
