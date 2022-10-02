import React from "react";
import autoAnimate from "@formkit/auto-animate";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

const fruitColor = {
  apple: 'red',
  orange: 'orange',
  grapes: 'violet',
  mango: 'yellow',
  strawberry: 'red',
  watermelon: 'red',
  durian: 'brown',
};

export default function App() {
  const [fruits, setFruits] = React.useState([]);
  const [text, setText] = React.useState([]);
  const [sortType, setSortType] = React.useState("default");
  const [lastSortTypeApplied, setLastSortTypeApplied] = React.useState(false);
  const parent = React.useRef(null);

  React.useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleAddFruit = (e) => {
    e.preventDefault();

    if (text.trim() !== "") {
      setFruits((prevState) => [
        ...prevState,
        {
          id: uuidv4(),
          name: text
        }
      ]);
      setText("");
    }
  };

  const handleRemove = (id) => {
    console.table(fruits.filter((fruit) => fruit.id !== id))
    setFruits((prevState) => prevState.filter((fruit) => fruit.id !== id));
  };

  const handleSort = () => {
    if (lastSortTypeApplied === sortType) return;
    if (sortType !== "asc" && sortType !== "desc") return;

    const newFruitsState = [...fruits];

    if (sortType === "asc") {
      newFruitsState.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortType === "desc") {
      newFruitsState.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFruits(newFruitsState);
    setLastSortTypeApplied(sortType);
  };

  const handleSortTypeSelect = (e) => {
    setSortType(e.target.value);
  };

  return (
    <div className="container">
      <ul ref={parent}>
        {fruits.map((fruit) => (
          <li key={fruit.name} style={{backgroundColor: fruitColor[fruit.name],}}>
            {fruit.name}
            <button onClick={() => handleRemove(fruit.id)} style={{ color: 'red', }}>x</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddFruit}>
        <select style={{ marginRight: "4px" }} onChange={handleSortTypeSelect}>
          <option value="default">Default</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button
          type="button"
          style={{ marginRight: "8px" }}
          onClick={handleSort}
        >
          Sort
        </button>
        <input value={text} onChange={handleChange} />
        <button type="submit" style={{ marginLeft: "4px" }}>
          Add Fruit
        </button>
      </form>
    </div>
  );
}
