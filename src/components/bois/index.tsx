import { Cadastro } from "..";
import "../../assets/bootstrap/css/bootstrap.min.css";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { useTabs } from "@/lib/stores";
import { Prisma } from "@prisma/client";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  peso: z.number(),
  raca: z.string(),
  novo_peso: z.number().optional(),
});

export default function Bois(props: { loteId: number }) {
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();
  const selectedTab = useTabs((state) => state.selectedTab);
  const { register, reset, setValue, watch, control } =
    useForm<z.infer<typeof schema>>();

  const handleClose = () => {
    setShow(false);
    setValue("novo_peso", undefined);
  };

  const handleConfirm = () => {
    setShow(false);
    setValue("peso", watch("novo_peso") ?? 0);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    if (selectedTab === "Editar") {
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
              InputProps={{
                endAdornment: (
                  <>
                    <InputAdornment position="end">kg</InputAdornment>
                    {selectedTab === "Editar" && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleShow}
                          onMouseDown={(event) => {
                            event.preventDefault();
                          }}
                          title="Adicionar nova pesagem"
                        >
                          <AiOutlinePlus />
                        </IconButton>
                      </InputAdornment>
                    )}
                  </>
                ),
              }}
              variant="standard"
              {...register("peso", { valueAsNumber: true })}
            />
            <TextField
              label="Raça"
              id="standard-start-adornment"
              className="col-sm-2"
              style={{ marginRight: "40px" }}
              variant="standard"
              {...register("raca")}
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
              onChange={(e) =>
                setValue("novo_peso", parseFloat(e.target.value))
              }
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
              <div className="flex items-center">
                <FaTimes />
                <span className="ml-1">Cancelar</span>
              </div>
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginRight: "10px", marginTop: "10px" }}
              onClick={handleConfirm}
            >
              <div className="flex items-center">
                <FaCheck />
                <span className="ml-1">Confirmar</span>
              </div>
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function getData(): Prisma.BoiCreateArgs | Prisma.BoiUpdateArgs["data"] {
    const data = watch();

    if (selectedId) {
      return {
        peso: data.peso,
        raca: data.raca,
        ...(data.novo_peso
          ? {
              pesagens: {
                create: {
                  peso: data.novo_peso,
                },
              },
            }
          : null),
      };
    } else {
      return {
        data: {
          peso: data.peso,
          raca: data.raca,
          pesagens: {
            create: {
              peso: data.peso,
            },
          },
          Lote: {
            connect: {
              id: props.loteId,
            },
          },
        },
      };
    }
  }

  function clearData() {
    reset();
  }

  /*   function editBottom() {
    if (!pesagens) return null;
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
          <ResponsiveContainer height={200} width="100%">
            <LineChart data={getData()}>
              <Tooltip />
              <Line type="monotone" dataKey="peso" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  } */

  /*   async function fetchData() {
    const ret = await api.get("tab_bois", null, props.fk);
    console.log(ret);
    return ret;
  } */

  return (
    <Cadastro<Prisma.BoiGetPayload<{}>>
      columns={[
        {
          name: "Identificação",
          selector: (row) => row.id,
          sortable: true,
          width: "10%",
        },
        {
          name: "Peso (Kg)",
          sortable: true,
          right: true,
          selector: (row) => row.peso,
          width: "160px",
        },
        { name: "Raça", selector: (row) => row.raca },
        { name: "GMD Kg/dia", sortable: true, selector: () => 0 },
      ]}
      api="/api/boi"
      addColumns={getAddColumns()}
      getData={getData()}
      clearData={clearData}
      setDataProp={(data) => {
        setValue("peso", data.peso);
        setValue("raca", data.raca);
      }}
      control={control}
      /* editBottom={editBottom()}
      fetchData={fetchData} */
      onSelectItem={(id) => setSelectedId(id)}
      tabTitle="Lista de Bois"
    />
  );
}
