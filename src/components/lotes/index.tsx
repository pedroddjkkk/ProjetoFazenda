import { TextField } from "@mui/material";
import { Cadastro, ComboEdit } from "..";
import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { Prisma } from "@prisma/client";
import axios from "axios";
import Bois from "../bois";

export default function Lotes(props: { fazendaId: number }) {
  const [nome, setNome] = useState("");
  const [idLote, setIdLote] = useState<number | undefined>();
  const [racao, setRacao] = useState<Prisma.RacaoGetPayload<{}>>();

  function getAddColumns() {
    return (
      <div className="add-div-group">
        <div className="row">
          <TextField
            label="Nome do Lote"
            id="standard-start-adornment"
            className="col-sm-3"
            style={{ marginRight: "40px" }}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            variant="standard"
          />
          <ComboEdit<Prisma.RacaoGetPayload<{}>>
            label="Ração"
            apiUrl="/api/racao"
            setValue={(row) => setRacao(row)}
            value={racao?.name ?? ""}
            className="col-sm-2"
            columns={[
              {
                name: "Identificação",
                selector: (row) => row.id,
                sortable: true,
                width: "10%",
              },
              { name: "Nome", selector: (row) => row.name },
            ]}
          />
        </div>
      </div>
    );
  }

  function getData() {
    return {
      name: nome,
      fazendaId: props.fazendaId,
      racaoId: racao?.id,
    };
  }

  function clearData() {
    setNome("");
  }

  async function fetchData() {
    const ret = await axios.get(`/api/lote/${props.fazendaId}`);
    return ret;
  }

  if (idLote) {
    return <Bois loteId={idLote} />;
  } else {
    return (
      <Cadastro<Prisma.LoteGetPayload<{}>>
        columns={[
          { name: "Identificação", selector: (row) => row.id, width: "10%" },
          { name: "Nome", selector: (row) => row.name },
        ]}
        api="api/lote"
        addColumns={getAddColumns()}
        tabTitle="Lista de Lotes"
        getData={getData()}
        clearData={clearData}
        setDataProp={(data) => {
          setNome(data.name);
        }}
        fetchData={fetchData}
        onTableRowClick={(row) => {
          setIdLote(row.id);
          setNome(row.name);
        }}
      />
    );
  }
}
