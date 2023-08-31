import Lotes from "@/components/lotes";
import { prisma } from "@/lib/db/prisma";
import { BadRequest } from "@/lib/responses";

export default async function LotePage(context: { params: { id: string } }) {
  const lotes = await prisma.lote.findMany({
    where: {
      fazendaId: Number(context.params.id),
    },
  });

  const fazenda = await prisma.fazenda.findUnique({
    where: {
      id: Number(context.params.id),
    },
  });

  if (!fazenda) return BadRequest("Fazenda não encontrada");

  return <Lotes lotes={lotes} fazenda={fazenda} />;
}
