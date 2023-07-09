"use client";

import { Prisma, TripReservation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserReservationItem from "./components/UserReservationItem";

// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "../api/auth/[...nextauth]/route";

export default function MyTrips() {
  // const data = await getServerSession(authOptions);

  // if (!data?.user) {
  //   redirect("/");
  // }
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{ include: { trip: true } }>[]
  >([]);
  const { status, data } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || (!data?.user && status !== "loading")) {
      return router.push("/");
    }

    async function fetchReservations() {
      const response = await fetch(
        `http://localhost:3000/api/user/${data?.user.id}/reservations`
      );

      const json = await response.json();

      setReservations(json);
    }

    fetchReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-primaryDarker text-xl">
        Minhas Viagens
      </h1>
      {reservations.map((reservation) => (
        <UserReservationItem key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
}
