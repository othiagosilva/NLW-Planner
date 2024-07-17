import { AtSign, Plus, X } from "lucide-react"
import { FormEvent, useState } from "react"
import { Button } from "../../components/button"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"

interface UpdateInviteGuestsModalProps {
  participants: Participant[]
  closeGuestsModal: () => void
}

interface Participant {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export function UpdateInviteGuestsModal({
  participants,
  closeGuestsModal,
}: UpdateInviteGuestsModalProps) {
  const { tripId } = useParams();
  const [emailToInvite, setEmailToInvite] = useState<string>('')
  const invitedEmails = participants.map(participant => participant.email)

  function addEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) return

    if (emailToInvite.includes(email)) {
      return
    }

    setEmailToInvite(email)

    event.currentTarget.reset()
  }

  const handleConfirm = async () => {
    if (emailToInvite.length > 0) {
      invitedEmails.push(...emailToInvite);

      const updatedTrip = {
        email: emailToInvite
      }

      try {
        await api.post(`/trips/${tripId}/invite`, updatedTrip);
        closeGuestsModal();
        setEmailToInvite('');
        window.location.reload();
      } catch (error) {
        console.error("Erro ao atualizar convidados:", error);
      }
    }
  }

  return (<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
    <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Adicionar convidado</h2>
          <button type="button" onClick={closeGuestsModal}>
            <X className="size-5 text-zinc-400" />
          </button>
        </div>
        <p className="text-sm text-zinc-400 flex items-start">
          O convidado adicionado irá receber um e-mail para confirmar sua viagem.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {emailToInvite.length > 0 && (
          <div className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
          <span className="text-zinc-300">{emailToInvite}</span>
          <button type="button" onClick={() => setEmailToInvite("")}>
            <X className="size-4 text-zinc-400" />
          </button>
        </div>
        )}
        {invitedEmails.map(email => (
          <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
            <span className="text-zinc-300">{email}</span>
          </div>
        ))}
      </div>

      <div className="w-full h-px bg-zinc-800" />

      <form onSubmit={addEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
        <div className="px-2 flex items-center flex-1 gap-2">
          <AtSign className="text-zinc-400 size-5" />
          <input type="email"
            name="email"
            className="bg-transparent placeholder-zinc-400 text-lg outline-none flex-1"
            placeholder="Digite o e-mail do convidado" />
        </div>

        <Button type="submit" variant="primary">
          Convidar
          <Plus className='size-5' />
        </Button>
      </form>
      <Button onClick={handleConfirm} size="full">
        Salvar Convidados
      </Button>
    </div>
  </div>
  )
}