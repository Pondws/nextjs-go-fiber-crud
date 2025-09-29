"use client"

import { PostForm } from "components"
import { useParams } from "next/navigation"

function PostEditPage() {
  const params = useParams()
  const id = params.id

  return <PostForm id={id as string} />
}

export default PostEditPage