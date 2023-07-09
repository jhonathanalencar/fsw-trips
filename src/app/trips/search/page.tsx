"use client";

import TripItem from "@/components/TripItem";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const searchParams = useSearchParams();

  const text = searchParams.get("text");
  const startDate = searchParams.get("startDate");
  const budget = searchParams.get("budget");

  useEffect(() => {
    async function fetchTrips() {
      const parsedDate =
        startDate && startDate !== "undefined"
          ? new Date(startDate).toISOString()
          : startDate;
      const fetchTripUrl = `/api/trips/search?text=${text}&startDate=${parsedDate}&budget=${budget}`;
      let parsedFetchTripUrl = fetchTripUrl.split("undefined").join("");

      const response = await fetch(parsedFetchTripUrl);
      const data = await response.json();

      setTrips(data);
    }

    fetchTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center p-5">
      <h1 className="text-primaryDarker font-semibold text-xl">
        Viagens Encontradas
      </h1>
      <h2 className="text-grayPrimary font-medium mb-5">
        {trips.length > 0
          ? "Listamos as melhores viagens pra você!"
          : "Não encontramos nada nos seus parâmetros! =("}
      </h2>

      <div className="flex flex-col gap-4">
        {trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
