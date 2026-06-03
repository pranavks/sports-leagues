export function RateLimitError() {
  return (
    <div className="text-center text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
      <p className="font-medium">Rate limit reached</p>
      <p className="text-amber-600">Please wait 1 minute before trying again.</p>
    </div>
  )
}
