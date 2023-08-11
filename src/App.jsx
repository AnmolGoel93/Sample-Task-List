import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import { taskList } from "./siteData/taskList"
import { useState } from "react"

const App = () => {
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState("")
  const [selectedTask, setSelectedTask] = useState({})
  const [mode, setMode] = useState("add")
  const [tasks, setTasks] = useState(taskList)

  const onAddEditTaskFormAddHandler = (task) => {
    if (mode === "add") {
      setTasks([task, ...tasks])
    } else {
      let updatedTasks = [...tasks]
      updatedTasks = updatedTasks.map((existingTask) => {
        if (existingTask.id === selectedTaskId) {
          existingTask.title = task.title
          existingTask.priority = task.priority
        }

        return existingTask
      })
      setTasks(updatedTasks)
    }

    setShowAddEditModal(false)
  }

  const onDeleteModalCloseHandler = () => {
    setTasks(tasks.filter((task) => task.id !== selectedTaskId))
    setShowDeleteModal(false)
  }

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button
            title="Add Task"
            icon={<Add />}
            onClick={() => {
              setMode("add")
              setShowAddEditModal(true)
            }}
          />
        </div>
        <div className="task-container">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEditTaskHandler={() => {
                setMode("edit")
                setSelectedTaskId(task.id)
                setSelectedTask(task)
                setShowAddEditModal(true)
              }}
              onDeleteTaskHandler={() => {
                setSelectedTaskId(task.id)
                setShowDeleteModal(true)
              }}
            />
          ))}
        </div>
      </div>
      {showAddEditModal && (
        <AddEditTaskForm
          mode={mode}
          selectedTaskId={selectedTaskId}
          selectedTask={selectedTask}
          onAddEditTaskFormCloseHandler={() => setShowAddEditModal(false)}
          onAddEditTaskFormAddHandler={onAddEditTaskFormAddHandler}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          onDeleteModalCloseHandler={onDeleteModalCloseHandler}
          onCancelModalCloseHandler={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  )
}

export default App
