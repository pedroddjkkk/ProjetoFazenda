import { CircularProgress, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ComboEditProps } from "@/types/combo-edit";
import axios from "axios";
import { Button } from "../ui/button";

export default function ComboEdit<T extends Record<string, any>>({
  apiUrl,
  label,
  columns,
  className,
  setValue,
  value,
  setTextValue,
}: ComboEditProps<T>) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [progressPending, setProgressPending] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function reloadData() {
      const ret = await axios.get(apiUrl);

      setData(ret.data);
      setProgressPending(false);
    }

    reloadData();
  }, [apiUrl]);

  return (
    <>
      <TextField
        label={label}
        className="col-sm-2"
        value={value}
        onChange={(e) => setTextValue && setTextValue(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                title="Buscar"
                onClick={handleShow}
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
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
            onRowClicked={(e) => {
              setValue(e);
              handleClose();
            }}
            paginationComponentOptions={{
              rowsPerPageText: "Registros por paginas:",
              rangeSeparatorText: "de",
              noRowsPerPage: false,
              selectAllRowsItem: false,
              selectAllRowsItemText: "All",
            }}
            noDataComponent={
              <span style={{ padding: "20px 0 40px 0" }}>
                Sem dados para a tabela
              </span>
            }
            progressPending={progressPending}
            progressComponent={
              <div style={{ padding: "40px 0 40px 0" }}>
                <CircularProgress />
              </div>
            }
            pagination
            highlightOnHover
            pointerOnHover
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="destructive">
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
