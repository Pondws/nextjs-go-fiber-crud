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

// const defaultVariants = {
//   page: 0,
//   limit: 10
// }

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
    queryKey: ['post'],
    queryFn: fetchData
  })

  const {
    mutate,
  } = useMutation({
    mutationFn: async (id: string) => {
      return postApi.deleteByID(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] })
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

      <Table
        rows={data || []}
        columns={POST.columns({
          onEdit: (id: string) => router.push(`${POST.path('edit')}/${id}`),
          onDelete: (id: string) => mutate(id),
        })}
        loading={isLoading}
      />
    </div>
  )
}

export const PostTable = memo(PostTableComp) 