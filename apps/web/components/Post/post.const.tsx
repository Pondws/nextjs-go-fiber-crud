import { ALERT_TEXT } from 'consts'
import { AlertTextType, PostType } from 'types'
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { format } from 'date-fns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button
} from 'components'
import { EllipsisVertical, SquarePen, Trash } from "lucide-react"

const defaultName = 'Post'
const defaultPaht = 'post'

const columnHelper = createColumnHelper<PostType.GetPost>()

export const POST = {
  text: (
    action: AlertTextType.ActionProps,
    status?: AlertTextType.StatusProps
  ) =>
    status
      ? `${ALERT_TEXT.action[action]}${defaultName}${ALERT_TEXT.status[status]}`
      : `${ALERT_TEXT.action[action]}${defaultName}`,
  path: (
    action?: AlertTextType.PathProps
  ) => action ? `/${defaultPaht}/${action}` : `/${defaultPaht}`,
  columns: (
    action: {
      onDelete?: (id: string) => void
      onEdit?: (id: string) => void
    }) => [
      columnHelper.accessor("createdAt", {
        header: "Created At",
        cell: info => {
          const { createdAt } = info.row.original
          return createdAt ? format(createdAt, 'dd/MM/yyyy') : '-'
        }
      }),
      columnHelper.accessor("title", {
        header: "Title",
      }),
      columnHelper.accessor("content", {
        header: "Content"
      }),
      columnHelper.display({
        id: 'action',
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 w-9 p-0">
                <span className="sr-only">Open menu</span>
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => action.onEdit?.(row.original.id)}
              >
                <SquarePen />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => action.onDelete?.(row.original.id)}
              >
                <Trash />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      })
    ] as ColumnDef<PostType.GetPost>[]
} 