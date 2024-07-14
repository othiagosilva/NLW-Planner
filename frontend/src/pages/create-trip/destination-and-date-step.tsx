import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    openGuestsInput: () => void
    closeGuestsInput: () => void
}
export function DestinationAndDateStep({
    isGuestsInputOpen,
    openGuestsInput,
    closeGuestsInput
}:DestinationAndDateStepProps) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className='size-5 text-zinc-400'/>
              <input disabled={isGuestsInputOpen} type="text" className="bg-transparent placeholder-zinc-400 text-lg outline-none flex-1" placeholder="Para onde você vai?"/>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className='size-5 text-zinc-400'/>
              <input disabled={isGuestsInputOpen} type="text" className="bg-transparent placeholder-zinc-400 text-lg w-40 outline-none" placeholder="Quando você vai?"/>
            </div>

            <div className='w-px h-6 bg-zinc-800'>

            </div>
            {isGuestsInputOpen ? (
              <Button onClick= {closeGuestsInput} variant="secondary">
                Alterar Local e Data
                <Settings2 className='size-5'/>
              </Button>
            ) :
            (
              <Button onClick= {openGuestsInput} variant="primary">
                Continuar
                <ArrowRight className='size-5'/>
              </Button>
          )}
        </div>
    )
}