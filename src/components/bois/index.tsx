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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import z from "zod";
import axios from "axios";

const schema = z.object({
  peso: z.number(),
  raca: z.string(),
  novo_peso: z.number().optional(),
});

export default function Bois(props: { loteId: number }) {
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();
  const [pesagens, setPesagens] = useState<Prisma.PesagemGetPayload<{}>[]>();
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

  async function fetchData() {
    const ret = await axios.get(`/api/boi/${props.loteId}`);
    return ret;
  }

  function editBottom() {
    if (!pesagens) return null;

    const formatedPesagens = pesagens.map((pesagem) => {
      const createdAt = new Date(pesagem.createdAt).toLocaleDateString("pt-BR");

      return {
        ...pesagem,
        createdAt,
      };
    });

    return (
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={formatedPesagens}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis unit={" kg"} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="peso"
              stroke="#8884d8"
              unit={" kg"}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <Cadastro<
      Prisma.BoiGetPayload<{
        include: {
          pesagens: true;
        };
      }>
    >
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
        setPesagens(data.pesagens);
      }}
      control={control}
      fetchData={fetchData}
      editBottom={editBottom()}
      onSelectItem={(id) => setSelectedId(id)}
      tabTitle="Lista de Bois"
    />
  );
}
