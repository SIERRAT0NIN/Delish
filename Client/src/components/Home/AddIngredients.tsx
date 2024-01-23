import React, { useState } from "react";

const addIngredients = () => {
  const [elementNumber, setElementNumber] = useState(1);
  const [elements, setElements] = useState([
    "An item",
    "A second item",
    "A third item",
    "A fourth item",
    "And a fifth one",
  ]);

  const addNewOption = () => {
    const newElement = `element ${elementNumber}`;
    setElementNumber(elementNumber + 1);
    setElements([...elements, newElement]);
  };

  const removeElement = (index) => {
    const updatedElements = elements.filter((_, i) => i !== index);
    setElements(updatedElements);
  };

  return (
    <div className="flex items-start" style={{ width: "18rem" }}>
      <ul
        className="w-96 overflow-hidden rounded-lg border border-neutral-200 bg-white text-neutral-900 dark:bg-neutral-600 dark:text-neutral-200"
        data-te-animation-ref
      >
        {elements.map((element, index) => (
          <li
            key={index}
            className="relative w-full border-neutral-200 bg-white px-6 py-2 dark:bg-neutral-600 [&:not(:last-child)]:border-b animate"
            onClick={() => removeElement(index)}
          >
            {element}
          </li>
        ))}
      </ul>
      <button
        type="button"
        data-te-animation-add-ref
        data-te-ripple-init
        data-te-ripple-color="light"
        className="ml-4 rounded bg-[#3b71ca] px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#386bc0] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#386bc0] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#3566b6] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
        onClick={addNewOption}
      >
        add
      </button>
    </div>
  );
};

export default addIngredients;
