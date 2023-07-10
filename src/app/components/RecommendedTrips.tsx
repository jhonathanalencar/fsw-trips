import TripItem from "@/components/TripItem";
import { prisma } from "@/lib/prisma";

async function fetchTrips() {
  const trips = await prisma.trip.findMany();

  return trips;
}

export default async function RecommendedTrips() {
  const data = await fetchTrips();

  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">
          Destinos Recomendados
        </h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>

      <div className="flex flex-col items-center mt-5 lg:mt-12 gap-5 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-10">
        {data.map((trip) => (
          <div key={trip.id} className="flex justify-center">
            <TripItem trip={trip} />
          </div>
        ))}
      </div>
    </div>
  );
}
