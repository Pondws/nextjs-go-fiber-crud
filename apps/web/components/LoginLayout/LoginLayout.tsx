import {
  Input,
  Button
} from "components"

export function LoginLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen gap-4 p-4">
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
          <Button className="w-full">
            Login
          </Button>
        </div>
      </div>
      <div className="rounded bg-gray-300">
      </div>
    </div>
  )
}