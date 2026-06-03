import { useQuery } from '@tanstack/react-query'
import { RateLimitError } from '../../ui/RateLimitError'
import { LoadingSkeleton } from './LoadingSkeleton'

export function SessionBadge({ leagueId }: { leagueId: string }) {
  const {
    data: imageUrl,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['season-badge', leagueId],
    queryFn: async () => {
      let res: Response
      try {
        res = await fetch(
          `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${leagueId}`
        )
      } catch {
        throw new Error('RATE_LIMIT')
      }
      if (res.status === 429) throw new Error('RATE_LIMIT')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const result = await res.json()
      const badgeUrl =
        result.seasons?.[result.seasons.length - 1]?.strBadge ||
        result.seasons?.[0]?.strBadge
      return badgeUrl
    },
    enabled: !!leagueId,
    staleTime: Infinity,
  })

  if (isLoading) return <LoadingSkeleton />
  if (error?.message === 'RATE_LIMIT') return <RateLimitError />
  if (error)
    return (
      <p className="text-sm text-red-500">
        Error loading badge: {error.message}
      </p>
    )

  return (
    <div className="bg-slate-100 p-5 rounded-xl">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Season Badge"
          className="max-w-full w-[300px] h-auto block mx-auto"
        />
      ) : (
        <div className="text-xl">No badge available</div>
      )}
    </div>
  )
}
