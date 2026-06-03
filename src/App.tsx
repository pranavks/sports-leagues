import { useQuery } from '@tanstack/react-query'
import { SearchBar } from './components/leagues/SearchBar'
import { useState } from 'react'
import { LeagueList } from './components/leagues/LeagueList'
import { SportsTypeDropdown } from './components/leagues/SportsTypeDropdown'
import { CUSTOM_SPORT_TYPES, type League } from './constants'
import { RateLimitError } from './components/ui/RateLimitError'
import { PageLoader } from './components/ui/PageLoader'
import { ApiNote } from './components/ui/ApiNote'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSport, setSelectedSport] = useState('all')
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ['all-leagues'],
    queryFn: async () => {
      let res: Response
      try {
        res = await fetch(
          'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php'
        )
      } catch {
        throw new Error('RATE_LIMIT')
      }
      if (res.status === 429) throw new Error('RATE_LIMIT')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const result = await res.json()

      // API returns only 'Soccer' for all leagues. Cycling through types to satisfy the filter requirement
      return result.leagues.map((league: League, index: number) => ({
        ...league,
        strSport: CUSTOM_SPORT_TYPES[index % CUSTOM_SPORT_TYPES.length],
      }))
    },
    staleTime: Infinity,
  })

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setSelectedLeagueId(null)
  }

  const handleSportChange = (value: string) => {
    setSelectedSport(value)
    setSelectedLeagueId(null)
  }

  const filteredLeagues = data?.filter((league: League) => {
    const matchesSearch = league.strLeague
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesSport =
      selectedSport === 'all' || league.strSport === selectedSport
    return matchesSearch && matchesSport
  })

  if (isLoading) return <PageLoader />
  if (error?.message === 'RATE_LIMIT')
    return (
      <div className="max-w-sm mx-auto mt-20">
        <RateLimitError />
      </div>
    )
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="max-w-5xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold text-center mb-8">Sports Leagues</h1>
      <ApiNote />
      <SearchBar handleSearch={handleSearch} selectedSport={selectedSport} />
      <div className="mb-4">
        <SportsTypeDropdown
          value={selectedSport}
          onValueChange={handleSportChange}
        />
      </div>
      <LeagueList
        leagues={filteredLeagues ?? []}
        selectedLeagueId={selectedLeagueId}
        setSelectedLeagueId={setSelectedLeagueId}
      />
    </div>
  )
}

export default App
