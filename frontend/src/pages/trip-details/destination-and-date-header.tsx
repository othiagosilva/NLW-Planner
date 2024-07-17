import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange, DayPicker } from "react-day-picker";

interface Trip {
  id: string;
  destination: string;
  startsAt: string;
  endsAt: string;
  isConfirmed: boolean;
  ownerName: string;
  ownerEmail: string;
  emailsToInvite: string[];
}

interface DestinationAndDateHeaderProps {
  isGuestsInputOpen: boolean
  eventStartAndEndDates?: DateRange
  openGuestsInput: () => void
  closeGuestsInput: () => void
  setEventStartAndEndDates: (eventStartAndEndDates: DateRange | undefined) => void
}

export function DestinationAndDateHeader({
  isGuestsInputOpen,
  eventStartAndEndDates,
  openGuestsInput,
  closeGuestsInput,
  setEventStartAndEndDates
}: DestinationAndDateHeaderProps) {

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

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
  
  const handleDestinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (trip) {
      setTrip({ ...trip, destination: event.target.value, startsAt: trip.startsAt, endsAt: trip.endsAt, emailsToInvite: trip.emailsToInvite, ownerName: trip.ownerName, ownerEmail: trip.ownerEmail });
    }
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    if (range && trip) {
      setTrip({ 
        ...trip, 
        startsAt: range.from?.toISOString() || '', 
        endsAt: range.to?.toISOString() || '' 
      });
      setEventStartAndEndDates(range);
    }
  };

  const handleConfirm = async () => {
    if (trip) {
      const updatedTrip = {
        ...trip,
        starts_at: trip.startsAt,
        ends_at: trip.endsAt,
        emails_to_invite: trip.emailsToInvite,
        owner_name: trip.ownerName,
        owner_email: trip.ownerEmail,
      };

      console.log("Atualizando viagem com dados:", updatedTrip);

      try {
        await api.put(`/trips/${tripId}`, updatedTrip);
        closeGuestsInput();
      } catch (error) {
        console.error("Erro ao atualizar a viagem:", error);
      }
    }
  };

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className='size-5 text-zinc-400' />
        {isGuestsInputOpen ? (
          <input 
            disabled={!isGuestsInputOpen} 
            type="text" 
            className="bg-transparent placeholder-zinc-400 text-lg outline-none flex-1" 
            placeholder="Para onde você vai?"
            onChange={handleDestinationChange}
          />
        ):(
          <div className="flex items-center gap-2">
            <span className="text-zinc-100 text-lg">{trip?.destination}</span>
          </div>
        )}
        
      </div>

      <button onClick={openDatePicker} disabled={!isGuestsInputOpen} className="flex items-center gap-2 text-left w-[240px]">
        <Calendar className='size-5 text-zinc-400' />
        <span className="text-zinc-400 text-lg w-40 flex-1">
          {displayedDate}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button type="button" onClick={closeDatePicker}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>
            <DayPicker mode="range" selected={eventStartAndEndDates} 
            onSelect={handleDateSelect} />
          </div>
        </div>
      )}


      <div className='w-px h-6 bg-zinc-800'>

      </div>
      {isGuestsInputOpen ? (
        <Button onClick={handleConfirm} variant="primary">
        Confirmar
        <ArrowRight className='size-5' />
        </Button>
        
      ) :
        (
          <Button onClick={openGuestsInput} variant="secondary">
          Alterar Local e Data
          <Settings2 className='size-5' />
          </Button>
        )}
    </div>
  );
}
