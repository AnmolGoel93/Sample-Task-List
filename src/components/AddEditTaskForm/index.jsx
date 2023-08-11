import classNames from "classnames"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"
import { useEffect, useState } from "react"

const AddEditTaskForm = ({
  mode,
  selectedTaskId,
  selectedTask,
  onAddEditTaskFormCloseHandler,
  onAddEditTaskFormAddHandler,
}) => {
  const [taskValue, setTaskValue] = useState("")
  const [priorityValue, setPriorityValue] = useState("low")

  useEffect(() => {
    if (mode === "edit") {
      setTaskValue(selectedTask.title)
      setPriorityValue(selectedTask.priority)
    }
  }, [selectedTaskId])

  const onAddEditTaskFormAddHandlerFunction = (e) => {
    e.preventDefault()
    if (mode === "add") {
      const newTask = {
        id: Date.now().toString(),
        title: taskValue,
        priority: priorityValue,
        status: "To Do",
        progress: 0,
      }

      onAddEditTaskFormAddHandler(newTask)
    } else {
      const updatedTask = {
        id: selectedTaskId,
        title: taskValue,
        priority: priorityValue,
        status: selectedTask.status,
        progress: selectedTask.progress,
      }
      onAddEditTaskFormAddHandler(updatedTask)
    }
  }

  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">{mode === "add" ? "Add Task" : "Edit Task"}</span>
            <Close className="cp" onClick={onAddEditTaskFormCloseHandler} />
          </div>
          <Input
            label="Task"
            placeholder="Type your task here..."
            onChange={(e) => setTaskValue(e.target.value)}
            name="title"
            value={taskValue}
          />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {["high", "medium", "low"].map((priority) => (
                <li
                  key={priority}
                  className={classNames(`${priorityValue === priority ? `${priority}-selected` : ""}`, priority)}
                  onClick={() => {
                    setPriorityValue(priority)
                  }}
                >
                  {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button
              title={mode === "add" ? "Add" : "Edit"}
              disabled={taskValue.trim() === ""}
              onClick={onAddEditTaskFormAddHandlerFunction}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm
