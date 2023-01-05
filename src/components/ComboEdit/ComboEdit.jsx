import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import { apiBuscar } from "../../services/api";
import BasicTable from "../Table/Table";

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
    const ret = await apiBuscar(tabela);
    setData(ret.data);
  }

  function handleClickTable(e) {
    setId(e.id_pk);
    handleClose();
  }

  return (
    <>
      <TextField
        label={label}
        className="col-sm-2"
        value={value}
        focused={id ? true : false}
        onChange={(e) => {
          setId(id);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleShow}
                onMouseDown={handleMouseDownSearch}
              >
                <i class="fa-solid fa-magnifying-glass"></i>
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
