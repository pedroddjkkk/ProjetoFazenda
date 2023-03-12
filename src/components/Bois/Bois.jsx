import Cadastro from "../Cadastro/Cadastro";
import "../../App.css";
import "../../assets/bootstrap/css/bootstrap.min.css";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import ComboEdit from "../ComboEdit/ComboEdit";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import api, { apiBuscar } from "../../services/api";

export default function Bois( props ) {
  const [peso, setPeso] = useState();
  const [raca, setRaca] = useState();
  const [show, setShow] = useState(false);
  const [peso_confirmed, setPesoConfirmed] = useState();
  const [id_racao, setId_racao] = useState();
  const [new_peso, setNewPeso] = useState();
  const [nome_racao, setNomeRacao] = useState();
  const [pesagens, setPesagens] = useState();
  const selectedTab = useSelector((state) => state.tabs.selectedTab);

  function getColumns() {
    return [
      {
        name: "Identificação",
        selector: (row) => row.id_pk,
        sortable: true,
        width: "10%",
      },
      {
        name: "Peso (Kg)",
        sortable: true,
        right: true,
        selector: (row) => row.peso,
        width: "100px",
      },
      { name: "Raça", selector: (row) => row.raca },
      { name: "Ração", selector: (row) => row.racao.nome },
      { name: "GMD Kg/dia", selector: (row) => row.gmd },
    ];
  }

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setShow(false);
    setNewPeso();
  };

  const handleConfirm = () => {
    setShow(false);
    setPesoConfirmed(true);
  };

  const handleShow = () => setShow(true);

  function getComboColumns() {
    return [
      {
        name: "Identificação",
        selector: (row) => row.id_pk,
        sortable: true,
        width: "10%",
      },
      { name: "Nome", selector: (row) => row.nome },
    ];
  }

  useEffect(() => {
    if (selectedTab === "Editar") {
      setPesoConfirmed(false);
    }
  }, [selectedTab]);

  function getAddColumns() {
    return (
      <>
        <div className="add-div-group">
          <div className="row">
            <TextField
              label="Peso"
              id="standard-start-adornment"
              className="col-sm-2"
              style={{ marginRight: "40px" }}
              value={peso_confirmed ? new_peso : peso}
              onChange={(e) => setPeso(e.target.value)}
              InputProps={{
                endAdornment: (
                  <>
                    <InputAdornment position="end">kg</InputAdornment>
                    {selectedTab === "Editar" && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleShow}
                          onMouseDown={handleMouseDown}
                          title="Adicionar nova pesagem"
                        >
                          <i class="fa-solid fa-plus"></i>
                        </IconButton>
                      </InputAdornment>
                    )}
                  </>
                ),
              }}
              variant="standard"
            />
            <TextField
              label="Raça"
              id="standard-start-adornment"
              className="col-sm-2"
              value={raca}
              onChange={(e) => setRaca(e.target.value)}
              style={{ marginRight: "40px" }}
              variant="standard"
            />
            <ComboEdit
              label="Ração"
              tabela="tab_racoes"
              setValue={setId_racao}
              value={nome_racao}
              className="col-sm-2"
              columns={getComboColumns()}
            />
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar nova pesagem</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextField
              label="Peso"
              id="standard-start-adornment"
              className="col-sm-3"
              style={{ marginRight: "40px" }}
              value={new_peso}
              onChange={(e) => setNewPeso(e.target.value)}
              InputProps={{
                endAdornment: (
                  <>
                    <InputAdornment position="end">kg</InputAdornment>
                  </>
                ),
              }}
              variant="standard"
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-danger"
              onClick={handleClose}
              style={{ marginRight: "10px", marginTop: "10px" }}
            >
              <i class="fa-solid fa-times" /> Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginRight: "10px", marginTop: "10px" }}
              onClick={handleConfirm}
            >
              <i class="fa-solid fa-check" /> Confirmar
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function getData() {
    return {
      peso: peso,
      raca: raca,
      id_racao: id_racao,
      new_peso: new_peso,
      id_lote: props.fk,
    };
  }

  function clearData() {
    setPeso("");
    setRaca("");
    setId_racao("");
    setNewPeso("");
  }

  function setData(data) {
    setPeso(data.peso);
    setRaca(data.raca);
    setId_racao(data.id_racao);
    setNewPeso(data.new_peso);
    setNomeRacao(data.racao.nome);
    setPesagens(data.pesagens);
  }

  function editBottom() {
    if(!pesagens) return null;
    const getData = () => {
      return pesagens.map((pesagem) => {
        return {
          peso: pesagem.peso,
        };
      });
    };
    return (
      <div className="row">
        <div className="col-sm-12"> 
          <ResponsiveContainer height={200} width='100%'>
            <LineChart data={getData()}>
              <Tooltip />
              <Line type="monotone" dataKey="peso" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  async function fetchData(){
    const ret = await api.get("tab_bois", null, props.fk);
    console.log(ret);
    return ret;
  }

  return (
    <Cadastro
      columns={getColumns()}
      table="tab_bois"
      addColumns={getAddColumns()}
      getData={getData()}
      clearData={clearData}
      setDataProp={setData}
      editBottom={editBottom()}
      fetchData={fetchData}
      tabTitle="Lista de Bois"
    />
  );
}
