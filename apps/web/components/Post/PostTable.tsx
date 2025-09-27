"use client"

import { memo } from "react"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
  Skeleton,
} from "components/ui"
import { PostType } from "types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { postApi } from "apis"

import {
  Pencil,
  Trash2
} from 'lucide-react'

function PostTableComp() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const fetchData = async () => {
    const res = await postApi.getAll()
    return res
  }

  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchData
  })

  const {
    mutate,
  } = useMutation({
    mutationFn: async (id: string) => {
      return postApi.deleteByID(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    }
  })

  return (
    <div className="p-4 overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <h1>Post Table</h1>
        <Button
          onClick={() => router.push('post/create')}
        >
          Add Post
        </Button>
      </div>

      <div className="w-full">
        {!isLoading ? (
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Title</TableHead>
                <TableHead className="text-right">Content</TableHead>
                <TableHead className="w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((row: PostType.GetPost) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.title}</TableCell>
                  <TableCell className="text-right">{row.content}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant='outline'
                      onClick={() => router.push(`/post/edit/${row.id}`)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant='outline'
                      onClick={() => mutate(row.id)}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Skeleton className="w-full" />
        )}
      </div>
    </div>
  )
}

export const PostTable = memo(PostTableComp) 