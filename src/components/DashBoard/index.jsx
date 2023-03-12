import 'admin-lte/dist/css/adminlte.min.css';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import api, { apiBuscar } from '../../services/api';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Tooltip } from 'react-bootstrap';

export default function Dashboard() {
  const [bois, setBois] = useState([]);
  const [numBois, setNumBois] = useState(0);

  const fetchData = async () => {
    const ret = await api.get("tab_bois");
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
              <NavLink to="/fazendas" className="small-box-footer">
                Mais Informações <i className="fas fa-arrow-circle-right"></i>
              </NavLink>
            </div>
          </div>
          <div className="col-lg-3">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={bois} dataKey="peso" nameKey="peso" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
