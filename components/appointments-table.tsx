"use client"

import { useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
} from "@tanstack/react-table"
import { ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type Appointment = {
  id: string
  patientName: string
  doctorName: string
  date: string
  time: string
  type: "virtual" | "in-person"
  status: "scheduled" | "completed" | "cancelled"
  symptoms: string
}

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "patientName",
    header: "Patient Name",
    cell: ({ row }: { row: Row<Appointment> }) => <div>{row.getValue("patientName")}</div>,
  },
  {
    accessorKey: "doctorName",
    header: "Doctor",
    cell: ({ row }: { row: Row<Appointment> }) => <div>{row.getValue("doctorName")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: { row: Row<Appointment> }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }: { row: Row<Appointment> }) => <div>{row.getValue("time")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }: { row: Row<Appointment> }) => (
      <div className="capitalize">{row.getValue("type")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<Appointment> }) => {
      const status = row.getValue("status") as string
      return (
        <div className={`capitalize font-medium ${
          status === "completed" ? "text-green-600" :
          status === "cancelled" ? "text-red-600" :
          "text-blue-600"
        }`}>
          {status}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<Appointment> }) => {
      const appointment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(appointment.id)}
            >
              Copy appointment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Update status</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Cancel appointment</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function AppointmentsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const data: Appointment[] = [
    {
      id: "1",
      patientName: "John Doe",
      doctorName: "Dr. Sarah Smith",
      date: "2024-03-15",
      time: "09:00 AM",
      type: "in-person",
      status: "scheduled",
      symptoms: "Fever, headache",
    },
    {
      id: "2",
      patientName: "Jane Smith",
      doctorName: "Dr. Michael Johnson",
      date: "2024-03-15",
      time: "10:30 AM",
      type: "virtual",
      status: "completed",
      symptoms: "Annual checkup",
    },
    // Add more sample data as needed
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Filter by patient name..."
          value={(table.getColumn("patientName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("patientName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No appointments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
} 