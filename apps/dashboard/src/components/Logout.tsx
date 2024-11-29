import { doLogout } from "@/actions"
import { Button } from "@nextui-org/react"

const Logout = () => {
  return (
    <form action={doLogout}>
        <Button size='sm' variant='flat' className="bg-sky-700" type="submit">
        Logout
      </Button>
    </form>
  )
}

export default Logout