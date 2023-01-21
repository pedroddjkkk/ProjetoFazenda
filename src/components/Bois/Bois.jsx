import Cadastro from "../Cadastro/Cadastro";
import "../../App.css";
import "../../assets/bootstrap/css/bootstrap.min.css";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import ComboEdit from "../ComboEdit/ComboEdit";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Bois() {
  const [peso, setPeso] = useState();
  const [raca, setRaca] = useState();
  const [show, setShow] = useState(false);
  const [peso_confirmed, setPesoConfirmed] = useState();
  const [id_racao, setId_racao] = useState();
  const [new_peso, setNewPeso] = useState();
  const [nome_racao, setNomeRacao] = useState();
  const selectedTab = useSelector((state) => state.tabs.selectedTab);

  function getColumns() {
    return [
      {
        name: "Identificação",
        selector: (row) => row.id_pk,
        sortable: true,
        width: "250px",
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
  }

  const handleShow = () => setShow(true);

  function getComboColumns() {
    return [
      {
        name: "Identificação",
        selector: (row) => row.id_pk,
        sortable: true,
        width: "250px",
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
        <div className="add-div-group container">
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
    setNomeRacao(data.racao.nome)
  }

  return (
    <Cadastro
      columns={getColumns()}
      table="tab_bois"
      addColumns={getAddColumns()}
      getData={getData()}
      clearData={clearData}
      setDataProp={setData}
    />
  );
}
