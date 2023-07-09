"use client";

import { TripReservation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "../api/auth/[...nextauth]/route";

export default function MyTrips() {
  // const data = await getServerSession(authOptions);

  // if (!data?.user) {
  //   redirect("/");
  // }
  const [reservations, setReservations] = useState<TripReservation[]>([]);
  const { status, data } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user) {
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

  return <div>MyTrips</div>;
}
