import "./style.css";
import React, { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleAddTask() {
    if (inputValue === "") {
      alert("You must write something");
    } else {
      setTasks((prevTasks) => [...prevTasks, inputValue]);
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, false]); // Initialize as unchecked
      setInputValue("");
      saveData();
    }
  }

  function handleToggleCheck(index) {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
    saveData();
  }

  function handleDeleteTask(index) {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks.splice(index, 1);
      const newCheckedItems = [...checkedItems];
      newCheckedItems.splice(index, 1);
      localStorage.setItem(
        "data",
        JSON.stringify({ tasks: newTasks, checkedItems: newCheckedItems })
      );
      return newTasks;
    });
  }

  function saveData() {
    // Save both tasks and checkedItems in an object in local storage.
    localStorage.setItem("data", JSON.stringify({ tasks, checkedItems }));
  }

  function showTasks() {
    const savedData = JSON.parse(localStorage.getItem("data"));
    if (savedData) {
      setTasks(savedData.tasks);
      setCheckedItems(savedData.checkedItems);
    }
  }

  useEffect(() => {
    showTasks();
  }, []);

  return (
    <div className="container">
      <div className="todo-app">
        <h2>To-Do List</h2>
        <div className="row">
          <input
            type="text"
            id="input-box"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={handleAddTask}>Add</button>
        </div>
        <ul id="list-container">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={checkedItems[index] ? "checked" : ""}
              onClick={() => handleToggleCheck(index)}
            >
              {task}
              <button
                className="delete-button"
                onClick={() => handleDeleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
