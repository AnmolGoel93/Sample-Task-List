import classNames from "classnames"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import CircularProgressBar from "../CircularProgressBar"
import "./style.scss"
import { useState } from "react"

const TaskCard = ({ task, onEditTaskHandler, onDeleteTaskHandler }) => {
  const { id, title, priority, status, progress } = task
  const [currentStatus, setCurrentStatus] = useState(status)
  const [currentProgress, setCurrentProgress] = useState(progress)

  const onUpdateTaskStatus = () => {
    if (currentStatus === "To Do") {
      setCurrentStatus("In Progress")
      setCurrentProgress(50)
    } else if (currentStatus === "In Progress") {
      setCurrentStatus("Done")
      setCurrentProgress(100)
    } else if (currentStatus === "Done") {
      setCurrentStatus("To Do")
      setCurrentProgress(0)
    }
  }

  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Task</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Priority</span>
        <span className={classNames(`${priority}-priority`, "priority")}>{priority}</span>
      </div>
      <div className="task-status-wrapper">
        <button className="status" onClick={onUpdateTaskStatus}>
          {currentStatus}
        </button>
      </div>
      <div className="progress">
        <CircularProgressBar strokeWidth={2} sqSize={24} percentage={currentProgress} />
      </div>
      <div className="actions">
        <EditIcon className="mr-20 cp" onClick={() => onEditTaskHandler(id)} />
        <DeleteIcon className="cp" onClick={() => onDeleteTaskHandler(id)} />
      </div>
    </div>
  )
}

export default TaskCard
