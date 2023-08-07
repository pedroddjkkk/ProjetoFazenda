import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import api from "../../services/api";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function ComboEdit({
  tabela,
  label,
  columns,
  className,
  setValue,
  value,
}) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [nome, setNome] = useState();

  const handleMouseDownSearch = (event) => {
    event.preventDefault();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    reloadData();
  }, []);

  useEffect(() => {
    setValue(id);
  }, [id]);

  async function reloadData() {
    const ret = await api.get(tabela);
    setData(ret.data);
  }

  function handleClickTable(e) {
    setId(e.id_pk);
    setNome(e.nome);
    handleClose();
  }

  return (
    <>
      <TextField
        label={label}
        className="col-sm-2"
        value={nome ? nome : value}
        focused={id ? true : false}
        onChange={(e) => {
          setId(id);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                title="Buscar"
                onClick={handleShow}
                onMouseDown={handleMouseDownSearch}
              >
                <FaMagnifyingGlass />
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataTable
            columns={columns}
            data={data}
            onRowClicked={handleClickTable}
            pagination
            highlightOnHover
            pointerOnHover
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
