"use client"

import {
  Input,
  Button
} from "components"
import Image from "next/image"

import image from '../../../public/images/login-image.jpg'
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen gap-4 p-4">
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col gap-4 max-w-md w-full">
          <h1 className="text-2xl font-bold">
            Login
          </h1>
          <Input
            label="Email"
            placeholder="Email"
          />
          <Input
            label="Password"
            placeholder="Password"
          />
          <Button
            onClick={() => router.push('/dashboard')}
          >
            Login
          </Button>
        </div>
      </div>

      <div className="w-full h-full relative">
        <Image
          src={image}
          alt="management"
          fill
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
    </div>
  )
}