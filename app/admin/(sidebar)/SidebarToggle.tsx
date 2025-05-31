import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

interface SidebarToggleProps {
  collapsed: boolean
  toggle: () => void
}

export default function SidebarToggle({ collapsed, toggle }: SidebarToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 rounded-full text-gray-400 hover:bg-gray-800 hover:text-white"
      onClick={toggle}
    >
      <ChevronLeft
        className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-180' : ''}`}
      />
    </Button>
  )
}