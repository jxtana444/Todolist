import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [listHTML, setListHTML] = useState("");

  // Load saved HTML from localStorage (same as showTask())
  useEffect(() => {
    const stored = localStorage.getItem("data");
    if (stored) {
      setListHTML(stored);
    }
  }, []);

  // Save HTML whenever listHTML changes (same as saveData())
  useEffect(() => {
    localStorage.setItem("data", listHTML);
  }, [listHTML]);

  // This runs AFTER React updates DOM → needed because listHTML uses innerHTML
  useEffect(() => {
    const listContainer = document.getElementById("list-container");

    if (!listContainer) return;

    // CLICK HANDLER (same as your original JS)
    listContainer.addEventListener(
      "click",
      function (e) {
        if (e.target.tagName === "LI") {
          e.target.classList.toggle("checked");
          saveHTML();
        } else if (e.target.tagName === "SPAN") {
          e.target.parentElement.remove();
          saveHTML();
        }
      },
      false
    );

    function saveHTML() {
      setListHTML(listContainer.innerHTML);
    }
  }, [listHTML]);

  // EXACT same addTask() logic
  const addTask = () => {
    if (task === "") {
      alert("You must write something!");
      return;
    }

    const newHTML =
      listHTML +
      `<li>${task}<span>\u00d7</span></li>`;

    setListHTML(newHTML);
    setTask("");
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h2>
          To-Do List <img src="/src/assets/todolisticon.jpg" />
        </h2>

        <div className="row">
          <input
            type="text"
            id="input-box"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add your text"
          />
          <button onClick={addTask}>Add</button>
        </div>

        {/* IMPORTANT: this recreates your original HTML list */}
        <ul
          id="list-container"
          dangerouslySetInnerHTML={{ __html: listHTML }}
        ></ul>
      </div>
    </div>
  );
}

export default App;
