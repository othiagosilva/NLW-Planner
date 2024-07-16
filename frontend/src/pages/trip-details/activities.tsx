import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
  id: string;
  occursAt: string;
  title: string;
}

export function Activities() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    api.get(`/trips/${tripId}/activities`).then(response => {
      setActivities(response.data);
      console.log(response.data);
    });
  }, [tripId]);

  const groupedActivities = activities.reduce((acc, activity) => {
    const date = activity.occursAt.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

  const sortedDates = Object.keys(groupedActivities).sort();

  return (
    <div className="space-y-8">
      {sortedDates.map(date => (
        <div key={date} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">
              Dia {format(new Date(date + 'T00:00:00'), 'dd', { locale: ptBR })}
            </span>
            <span className="text-xs text-zinc-500">
              {format(new Date(date), 'EEEE', { locale: ptBR })}
            </span>
          </div>
          {groupedActivities[date].length > 0 ? (
            <div className="space-y-2.5">
              {groupedActivities[date].map(activity => (
                <div key={activity.id}>
                  <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                    <CircleCheck className="size-5 text-lime-300" />
                    <span className="text-zinc-100">{activity.title}</span>
                    <span className="text-zinc-400 text-sm ml-auto">
                      {format(new Date(activity.occursAt), 'HH:mm')}h
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
          )}
        </div>
      ))}
    </div>
  );
}
