import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { apiBuscar } from "../../services/api";
import BasicTable from "../Table/Table";

export default function ComboEdit({ tabela, label, columns, className }) {
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

  async function reloadData() {
    const ret = await apiBuscar(tabela);
    setData(ret.data);
  }

  async function handleClickTable(e) {
    let id = e.target.parentElement.childNodes[0].innerText;
    setId(id);
    handleClose();
  }

  return (
    <>
      <TextField
        label={label}
        className="col-sm-2"
        value={id}
        focused={id ? true : false}
        onChange={(e) => setId(e.target.value)}
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
          )
        }}
        variant="standard"
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BasicTable cells={columns} rows={data} onClick={handleClickTable}/>
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
