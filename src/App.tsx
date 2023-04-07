import "./App.css";
import useApp from "./components/useApp";
import { Button } from "@mui/material";

function App() {
  const {
    changes,
    input,
    addTask,
    tasks,
    saveTask,
    editTask,
    selectedTask,
    setSelectedTask,
    deleteTask,
    handleKeyDown,
  } = useApp();
  return (
    <div className="App">
      <input
        type="text"
        onChange={changes}
        value={input}
        onKeyDown={handleKeyDown}
        placeholder="Write your homework"
        required
      />
      {selectedTask ? (
        <>
          <Button variant="outlined" onClick={saveTask}>
            Save
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setSelectedTask(null)}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Button onClick={addTask} variant="contained" color="success">
          Add
        </Button>
      )}
      <hr />
      <div>
        {tasks.length > 0 ? (
          tasks.map((items) => {
            return (
              <div key={items.id} className="box_task">
                <section className="box_txttask">{items.task}</section>
                <section>
                  <Button variant="outlined" onClick={() => editTask(items.id)}>
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteTask(items.id)}
                  >
                    Delete
                  </Button>
                </section>
              </div>
            );
          })
        ) : (
          <>Does not contain tasks yet</>
        )}
      </div>
    </div>
  );
}

export default App;
