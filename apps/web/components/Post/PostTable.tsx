"use client"

import { memo } from "react"
import {
  Table,
  Button
} from "components"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { postApi } from "apis"
import { POST } from "./post.const"
import { useTableHeight } from "hooks"

function PostTableComp() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const height = useTableHeight()

  const fetchData = async () => {
    const res = await postApi.getAll()
    return res
  }

  const {
    data,
    isFetching
  } = useQuery({
    queryKey: ['post'],
    queryFn: fetchData
  })

  const {
    mutate,
  } = useMutation({
    mutationFn: (id: string) => postApi.deleteByID(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["post"] })
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1>Post Table</h1>
        <Button
          onClick={() => router.push(POST.path('create'))}
        >
          Add Post
        </Button>
      </div>

      <Table
        rows={data || []}
        columns={POST.columns({
          onEdit: (id) => router.push(`${POST.path('edit')}/${id}`),
          onDelete: (id) => mutate(id),
        })}
        loading={isFetching}
        height={height}
      />
    </div>
  )
}

export const PostTable = memo(PostTableComp) 