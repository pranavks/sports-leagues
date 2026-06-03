import * as Select from '@radix-ui/react-select'
import { LuListFilter } from 'react-icons/lu'
import { CUSTOM_SPORT_TYPES } from '../../constants'

interface SportsTypeDropdownProps {
  value: string
  onValueChange: (value: string) => void
}

export function SportsTypeDropdown({
  value,
  onValueChange,
}: SportsTypeDropdownProps) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className="flex items-center gap-2 rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
        <LuListFilter className="text-gray-500" />
        <Select.Value placeholder="All Sports" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="rounded border border-gray-200 bg-white shadow-md">
          <Select.Viewport className="p-1">
            <Select.Item
              value="all"
              className="cursor-pointer rounded px-3 py-1.5 text-sm outline-none hover:bg-gray-100 data-[highlighted]:bg-gray-100 data-[highlighted]:ring-2 data-[highlighted]:ring-inset data-[highlighted]:ring-blue-500"
            >
              <Select.ItemText>All Sports</Select.ItemText>
            </Select.Item>
            {CUSTOM_SPORT_TYPES.map((sport) => (
              <Select.Item
                key={sport}
                value={sport}
                className="cursor-pointer rounded px-3 py-1.5 text-sm outline-none hover:bg-gray-100 data-[highlighted]:bg-gray-100 data-[highlighted]:ring-2 data-[highlighted]:ring-inset data-[highlighted]:ring-blue-500"
              >
                <Select.ItemText>{sport}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
