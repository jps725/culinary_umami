import React, { useState, useEffect } from "react";
import "./instructionInput.css";

const InstructionInput = ({ idx, returnMethods }) => {
  const [step_number, setStepNumber] = useState([]);
  const [method, setMethod] = useState([]);

  const updateStepNumber = (e) => setStepNumber(e.target.value);
  const updateMethod = (e) => setMethod(e.target.value);

  useEffect(() => {
    returnMethods(idx, { step_number, method });
  }, [step_number, method]);

  return (
    <div id="instruction__input">
      <div>
        <label>Step Number</label>
        <input
          type="number"
          name="step_number"
          onChange={updateStepNumber}
          value={step_number}
        ></input>
      </div>
      <div>
        <label>Instruction</label>
        <input
          type="text"
          name="method"
          onChange={updateMethod}
          value={method}
        ></input>
      </div>
    </div>
  );
};

export default InstructionInput;
