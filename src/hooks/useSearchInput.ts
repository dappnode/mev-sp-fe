import { useState } from 'react'
import { useDebounce } from 'use-debounce'

export function useSearchInput() {
  const [searchInput, setSearchInput] = useState<string>('')
  const [debouncedSearchInput] = useDebounce(searchInput, 500)

  return { searchInput, setSearchInput, debouncedSearchInput }
}
