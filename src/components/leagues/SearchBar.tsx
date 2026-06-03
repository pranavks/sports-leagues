export function SearchBar({
  handleSearch,
  selectedSport,
}: {
  handleSearch: (value: string) => void
  selectedSport: string
}) {
  return (
    <div>
      <input
        type="text"
        placeholder={`Search ${selectedSport === 'all' ? 'all' : selectedSport.toLowerCase()} leagues...`}
        onChange={(e) => handleSearch(e.target.value)}
        className="border border-slate-400 py-2 px-4 rounded-md mx-auto block w-[500px] max-w-full mb-4"
      />
    </div>
  )
}
