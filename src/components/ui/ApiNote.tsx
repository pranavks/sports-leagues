export function ApiNote() {
  return (
    <p className="text-sm leading-tight mb-4">
      (Note: Since the{' '}
      <a
        href="https://www.thesportsdb.com/api/v1/json/3/all_leagues.php"
        target="_blank"
        className="underline"
      >
        API
      </a>{' '}
      only provided 'Soccer' sport type, i've tweaked the sport type of each
      league. Also, 'strLeagueAlternate' is not present in the API response,
      so that is not included.)
    </p>
  )
}
