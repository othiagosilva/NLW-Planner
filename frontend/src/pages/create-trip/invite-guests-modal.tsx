import { AtSign, Plus, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"

interface InviteGuestsModalProps {
    closeGuestsModal: () => void
    emailsToInvite: string[]
    addEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
    removeEmailToInvite: (email: string) => void
}

export function InviteGuestsModal({
    closeGuestsModal,
    emailsToInvite,
    addEmailToInvite,
    removeEmailToInvite
}: InviteGuestsModalProps) {

    return (<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Selecionar convidados</h2>
                  <button type="button" onClick= {closeGuestsModal}>
                    <X className="size-5 text-zinc-400"/>
                  </button>
                </div>
                <p className="text-sm text-zinc-400 flex items-start">
                  Os convidados selecionados irão receber e-mails para confirmar sua viagem.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {emailsToInvite.map(email => {
                  return (
                    <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"> 
                      <span className="text-zinc-300">{email}</span>
                      <button type="button" onClick={() => removeEmailToInvite(email)}>
                        <X className="size-4 text-zinc-400"/>
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className="w-full h-px bg-zinc-800"/>

              <form onSubmit={addEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <div className="px-2 flex items-center flex-1 gap-2">
                  <AtSign className="text-zinc-400 size-5"/>
                  <input type="email" 
                         name="email" 
                         className="bg-transparent placeholder-zinc-400 text-lg outline-none flex-1" 
                         placeholder="Digite o e-mail do convidado"/>
                </div>
                
                <Button type="submit" variant="primary">
                  Convidar
                  <Plus className='size-5'/>
                </Button>
              </form>
            </div>
          </div>
    )
}