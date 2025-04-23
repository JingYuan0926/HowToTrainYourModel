import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@heroui/react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">HeroUI Demo</p>
            <p className="text-small text-default-500">Beautiful React UI Library</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="space-y-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              variant="bordered"
            />
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-between">
          <Button color="danger" variant="flat">
            Cancel
          </Button>
          <Button color="primary">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
