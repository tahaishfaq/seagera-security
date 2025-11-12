import { cn } from "@/lib/utils"

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  paused: {
    label: "Paused",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  ended: {
    label: "Ended",
    className: "bg-gray-100 text-gray-700 border-gray-200",
  },
  open: {
    label: "Open",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  closed: {
    label: "Closed",
    className: "bg-gray-100 text-gray-700 border-gray-200",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
}

export function StatusPill({ status, className }) {
  const config = statusConfig[status] ?? statusConfig.pending

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  )
}
