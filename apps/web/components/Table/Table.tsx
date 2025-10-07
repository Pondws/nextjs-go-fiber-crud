"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table as TableBase,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table"
import { Inbox } from "lucide-react"
import { Skeleton } from "components"

interface TableProps<T> {
  rows: T[]
  columns: ColumnDef<T>[]
  loading: boolean
  totalRows?: number
  height?: string
  onRowClick?: (row: T) => void
}

interface ColumnMeta {
  width?: string | number
}

export const Table = <T,>(props: TableProps<T>) => {
  const {
    rows,
    columns,
    loading = false,
    totalRows,
    height,
    onRowClick
  } = props

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  console.log('onRowClick', onRowClick)

  return (
    <>
      {!loading
        ?
        <div
          className='rounded-sm border'
        // style={{ height }}
        >
          <TableBase>
            <TableHeader id='table-header' className="flex-none">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      className={`h-9 ${header.column.id === 'action' ? 'text-right w-[60px]' : ''
                        }`}
                      style={{ width: (header.column.columnDef.meta as ColumnMeta)?.width || header.getSize() }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                  )}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {rows.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell align="center" colSpan={columns.length} style={{ height }}>
                    <Inbox size={84} strokeWidth={1} />
                    No data
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => onRowClick?.(row?.original)}
                    className={onRowClick ? 'cursor-pointer' : ''}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={`h-9 ${cell.column.id === 'action' ? 'text-right w-[60px]' : ''
                          }`}
                        style={{ width: (cell.column.columnDef.meta as ColumnMeta)?.width || cell.column.getSize() }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>

            {rows.length > 0 && (
              <TableFooter id='table-footer'>
                <TableRow>
                  <TableCell colSpan={columns.length}>{`ทั้งหมด ${totalRows}`}</TableCell>
                </TableRow>
              </TableFooter>
            )}
          </TableBase>
        </div>
        : <Skeleton className="w-full h-[450px]" />
      }
    </>
  )
}