import { prisma } from "@/lib/prisma";

async function getTrips() {
  const trips = await prisma.trip.findMany({});

  return trips;
}

export default async function Trips() {
  const data = await getTrips();

  console.log(data);

  return <div>Trips</div>;
}
