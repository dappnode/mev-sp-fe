import { ChangeEvent } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

interface SearchInputProps {
  placeholder?: string
  value: string
  onChange?: (value: string) => void
}

export function SearchInput({
  placeholder,
  value,
  onChange,
}: SearchInputProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value)
    }
  }

  return (
    <div className="relative flex w-full items-center">
      <AiOutlineSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-DAppGray" />
      <input
        className="rounded-md border border-DAppNeutral/100 py-3 pl-9 pr-4 text-sm font-normal text-DAppDeep placeholder:font-light placeholder:text-DAppGray focus:outline-none dark:border-DAppDarkSurface/200 dark:bg-DAppDarkSurface/300 dark:text-DAppDarkText"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  )
}
