import 'admin-lte/dist/css/adminlte.min.css';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { apiBuscar } from '../../services/api';

export default function Dashboard() {
  const [bois, setBois] = useState([]);
  const [numBois, setNumBois] = useState(0);

  const fetchData = async () => {
    const ret = await apiBuscar("tab_bois");
    setBois(ret.data);
  }
  
  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    setNumBois(bois.length);
  }, [bois])

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-6">
            <div className="small-box bg-info">
              <div className="inner">
                <h3>{numBois}</h3>
                <p>Bois</p>
              </div>
              <div className="icon">
                <i className="fa-solid fa-cow"></i>
              </div>
              <NavLink to="/bois" className="small-box-footer">
                Mais Informações <i className="fas fa-arrow-circle-right"></i>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
