"use client";
import { useEffect, useRef, useState } from "react";
/* import { useDispatch, useSelector } from "react-redux"; */
import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/styles.min.css";
/* import { changeUser } from "../../redux/actions/userSlice"; */
import { fadeIn } from "@/utils/fade";
import { FaTractor, FaSignOutAlt, FaBars } from "react-icons/fa";
import Script from "next/script";
import Link from "next/link";
import { pages } from "@/utils/pages";
import { usePathname } from "next/navigation";
import { useUser } from "@/utils/stores";

function Navbar({ children }: { children: React.ReactNode }) {
  const [navbarVisible, setNavbarVisible] = useState(true);
  /*   const dispatch = useDispatch();*/
  const selectedUser = useUser((state) => state.user);
  const changeSelectedUser = useUser((state) => state.changeUser);
  const pathname = usePathname();
  const fadeInRef = useRef(null);
  /*   const selectedTab = useSelector((state) => state.tabs.selectedTab); */

  useEffect(() => {
    fadeIn(fadeInRef);
  }, [fadeInRef]);

  return (
    <div id="page-top">
      <div id="wrapper">
        <div id="nav-transition">
          <nav
            className={`navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 fixed-top ${
              navbarVisible ? "" : "hidden"
            }`}
            id="navbar"
          >
            <div className="container-fluid d-flex flex-column p-0">
              <a
                className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
                href="#"
              >
                <div className="sidebar-brand-icon rotate-n-15">
                  <FaTractor size={32} />
                </div>
                <div className="sidebar-brand-text mx-3">
                  <span>Agro</span>
                </div>
              </a>
              <hr className="sidebar-divider my-0" />
              <ul id="accordionSidebar" className="navbar-nav text-light">
                {pages.map((item, index) => {
                  return (
                    <li className="nav-item" key={index}>
                      <Link className="nav-link" href={item.path}>
                        <div
                          className={`flex justify-start items-center flex-row ${
                            item.path === pathname ? "text-white" : ""
                          }`}
                        >
                          {item.icon()}
                          <span className="ml-2">{item.name}</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
        <div
          className={`d-flex flex-column ${navbarVisible ? "" : "hidden"}`}
          id="content-wrapper"
        >
          <div id="content">
            <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
              <div className="container-fluid">
                <button
                  className="btn btn-link d-md-none rounded-circle me-3"
                  id="sidebarToggleTop"
                  type="button"
                  onClick={() => setNavbarVisible(!navbarVisible)}
                >
                  <FaBars />
                </button>
                <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-gro up"></div>
                </form>
                <div className="column" style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "16px" }}>
                    {selectedUser && selectedUser.name}
                  </span>
                  <Link
                    className="nav-link"
                    href="/"
                    onClick={() => changeSelectedUser(null)}
                  >
                    <div className="flex items-center">
                      <FaSignOutAlt size={16} />
                      <span className="ml-2">Sair</span>
                    </div>
                  </Link>
                </div>
              </div>
            </nav>
            <div className="container-fluid" ref={fadeInRef}>
              {children}
            </div>
          </div>
          <footer className="bg-white sticky-footer small-footer">
            <div className="container my-auto">
              <div className="text-center my-auto copyright">
                <span>Copyright © 2023</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <Script src="../../assets/js/script.min" />
    </div>
  );
}

export default Navbar;
