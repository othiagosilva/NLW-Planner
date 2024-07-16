import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Trip {
  id: string;
  destination: string;
  startsAt: string;
  endsAt: string;
  isConfirmed: boolean;
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams();
  console.log(tripId)
  const [trip, setTrip] = useState<Trip | undefined>();

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => {
      setTrip(response.data);
    }).catch(error => {
      console.log(error)
    })
  }, [tripId]);

  const displayedDate = trip?.startsAt && trip?.endsAt
    ? (() => {
        return format(new Date(trip?.startsAt), "d' de 'MMM", { locale: ptBR })
              .concat(' até ')
              .concat(format(new Date(trip?.endsAt), "d' de 'MMM", { locale: ptBR }));
      })()
    : null

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}
