import Button from "@/components/Button";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { toast } from "react-toastify";

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{ include: { trip: true } }>;
}

export default function UserReservationItem({
  reservation,
}: UserReservationItemProps) {
  async function handleDeleteClick() {
    const res = await fetch(
      `http://localhost:3000/api/trips/reservation/${reservation.id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      return toast.error("Ocorreu um erro ao cancelar a reserva!", {
        position: "bottom-center",
      });
    }

    toast.success("Reserva cancelada com sucesso!", {
      position: "bottom-center",
    });
  }

  return (
    <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
      <div className="flex items-center gap-3 pb-5 border-b border-grayLighter border-solid">
        <div className="relative h-[106px] w-[124px]">
          <Image
            src={reservation.trip.coverImage}
            fill
            style={{ objectFit: "cover" }}
            alt={reservation.trip.name}
            className="rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl text-primaryDarker font-semibold">
            {reservation.trip.name}
          </h2>

          <div className="flex items-center gap-1 my-1">
            <ReactCountryFlag countryCode={reservation.trip.countryCode} svg />
            <p className="text-xs text-grayPrimary underline">
              {reservation.trip.location}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-5 text-primaryDarker">
        <h3 className="text-sm">Data</h3>
        <div className="flex items-center gap-1">
          <p className="text-sm">
            {format(new Date(reservation.startDate), "dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
          {" - "}
          <p className="text-sm">
            {format(new Date(reservation.endDate), "dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <h3 className="text-sm mt-5">Hóspedes</h3>
        <p className="text-sm pb-5">{reservation.guests} hóspedes</p>

        <h3 className="font-semibold text-primaryDarker mt-3 pt-5 border-t border-solid border-grayLighter">
          Informações sobre o preço
        </h3>

        <div className="flex justify-between mt-1">
          <div className="text-primaryDarker text-sm">Total:</div>
          <p className="font-medium text-sm">
            R${Number(reservation.totalPaid)}
          </p>
        </div>
      </div>

      <Button variant="danger" className="mt-5" onClick={handleDeleteClick}>
        Cancelar
      </Button>
    </div>
  );
}
