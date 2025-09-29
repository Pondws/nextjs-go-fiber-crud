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
  // TableFooter,
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
}

export const Table = <T,>(props: TableProps<T>) => {
  const {
    rows,
    columns,
    loading = false
  } = props

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      {!loading
        ?
        <div className="rounded-sm border">
          <TableBase>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      className={`h-9 ${
                        header.column.id === 'action' ? 'text-right w-[60px]' : ''
                      }`}
                      style={{ width: header.getSize() }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {rows.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell align="center" colSpan={columns.length} className="h-[400px]">
                    <Inbox size={84} strokeWidth={1} />
                    No data
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={`h-9 ${
                          cell.column.id === 'action' ? 'text-right w-[60px]' : ''
                        }`}
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>

            {/* <TableFooter>
              <TableRow>
                <TableCell colSpan={columns.length}>Total</TableCell>
              </TableRow>
            </TableFooter> */}
          </TableBase>
        </div>
        : <Skeleton className="w-full h-[450px]" />
      }
    </>
  )
}