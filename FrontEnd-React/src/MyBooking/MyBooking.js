import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Container } from "react-bootstrap";
import CardView from "../components/Card";
import "./MyBooking.css";

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}

      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function MyBooking() {
  const [appointments, setAppointments] = useState("");
  const [dataStatus, setDataStatus] = useState(false);

  const getInfo = async () => {
    const res = await fetch("/get_appointment_query", { method: "GET" });
    const data = await res.json();
    console.log(data);
    setAppointments(data);
    setDataStatus(true);
  };
  useEffect(() => {
    getInfo();
  }, []);

  const [todos, setTodos] = useState([
    {
      text: "Booking at 7am",
      isCompleted: false,
    },
    {
      text: "7pm at Financial Center",
      isCompleted: false,
    },
    {
      text: "Parking lot near Golden Gate Bridge afternoon",
      isCompleted: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <Container>
      {dataStatus ? (
        <div className="grid ">
          {appointments.map((t) => (
            <ul>
              <li key={t.id}>
                from {t.start}
                to {t.end}
              </li>
            </ul>

            //<p key={t.id}>{t.end}</p>
            //<CardView appointment={t} start={t.start} end={t.end} />
          ))}
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </Container>
  );
}

export default MyBooking;
