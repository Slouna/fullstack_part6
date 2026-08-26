import { useNotifications, useNotificationActions } from "../store";
import { useAnecdotes } from "../store";

const Notification = () => {
  const notification = useNotifications()


  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  if (notification === null){
    return(
      <div>

      </div>
    )
  }
  return (
    <div style={style} data-testid="notification">
      {notification} 
    </div>
  )
}

export default Notification
