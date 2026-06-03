import { type League } from '../../constants'
import { SessionBadge } from './SeasonBadge'

export function LeagueList({
  leagues,
  selectedLeagueId,
  setSelectedLeagueId,
}: {
  leagues: League[]
  selectedLeagueId: string | null
  setSelectedLeagueId: (id: string) => void
}) {
  if (!leagues || leagues.length === 0) {
    return <div className="mt-20 text-center">No leagues found.</div>
  }

  return (
    <div className="flex max-sm:flex-col gap-6">
      <div className="basis-1/2">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="px-3 py-2 font-medium">League</th>
              <th className="px-3 py-2 font-medium">Sport</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leagues?.map((league) => (
              <tr
                key={league.idLeague}
                onClick={() => setSelectedLeagueId(league.idLeague)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSelectedLeagueId(league.idLeague)
                  }
                }}
                className={`cursor-pointer hover:bg-gray-50 ${selectedLeagueId === league.idLeague ? 'bg-blue-50 font-medium' : ''}`}
                tabIndex={0}
              >
                <td className="px-3 py-2">{league.strLeague}</td>
                <td className="px-3 py-2">
                  <span className="bg-amber-100 px-2 py-0.5 rounded-md">
                    {league.strSport}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="basis-1/2 p-3 flex justify-center items-center">
        {selectedLeagueId ? (
          <SessionBadge leagueId={selectedLeagueId} />
        ) : (
          <div className="text-xl">Select a league to see its badge</div>
        )}
      </div>
    </div>
  )
}
