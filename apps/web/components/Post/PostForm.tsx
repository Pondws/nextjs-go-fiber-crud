"use client"

import { memo, useEffect } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  Input,
  Button
} from "components"
import { postApi } from 'apis'
import { useRouter } from 'next/navigation'
import { PostType } from 'types'

import { toast } from 'sonner'
import { handleError } from "utils"

const defaultValues = {
  title: '',
  content: ''
}

const schema = z.object({
  title: z.string().nonempty('Title is required'),
  content: z.string().nonempty('Content is required'),
})

function PostFormComp(props: { id?: string }) {
  const { id } = props
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues
  })

  const {
    data,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => {
      if (!id) throw new Error("ID is required")
      return postApi.getByID(id)
    },
    enabled: !!id
  })

  useEffect(() => {
    if (data) reset(data)
  }, [data, reset])

  const submitPost = useMutation({
    mutationFn: async (value: PostType.CreatePost) => {
      if (id) {
        postApi.update(id, value)
      } else {
        postApi.create(value)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] })
      toast.success("บันทึกข้อมูลสำเร็จ")
      router.push('/post')
    },
    onError: (error) => {
      toast.error(handleError(error))
    }
  })

  return (
    <form
      className='flex flex-col gap-2 p-4'
      onSubmit={handleSubmit(values => submitPost.mutate(values))}
    >
      <Input
        {...register('title')}
        label='Title'
        placeholder='Please fill Title'
        helperText={errors.title ? errors.title.message : ''}
        error={!!errors.title}
      />

      <Input
        {...register('content')}
        label='Content'
        placeholder='Please fill Content'
        helperText={errors.content ? errors.content.message : ''}
        error={!!errors.content}
      />

      <Button type="submit">
        Submit
      </Button>
    </form>
  )
}

export const PostForm = memo(PostFormComp)