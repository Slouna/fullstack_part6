import { useContext } from "react"
import AnecdoteContext from "./NotificationContext"

const Notification = () => {
  const {message} = useContext(AnecdoteContext)


  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (message===null) return null

  return <div data-testid="notification" style={style}>{message}</div>
}

export default Notification
