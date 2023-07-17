import { Pagination } from '.'
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Pagination> = {
  title: 'table/components/Pagination',
  component: Pagination,

  decorators: [
    (Story, options) => {
      const [currentPage, setCurrentPage] = useState<number>(1)
      return (
        <Story
          args={{
            ...options.args,
            currentPage,
            setCurrentPage,
          }}
        />
      )
    },
  ],
  argTypes: {
    currentPage: {
      table: {
        disable: true,
      },
    },
    setCurrentPage: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Primary: Story = {
  args: {
    totalPages: 10,
    totalItems: 100,
    itemsPerPage: 10,
  },
}
