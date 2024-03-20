import React, { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

const Sidebar = () => {

  const [ iterations, setIterations ] = useState();

  return (
    <>
      <div style={{ padding: '0.5rem' }}>
        <label htmlFor="iterations">Iterations to run</label>
        <div className="p-inputgroup flex-1">
          <InputNumber
            id="iterations"
            value={iterations}
            onValueChange={(e) => setIterations(e.value)}
          />
          <Button label="Run" />
        </div>
      </div>
    </>
  )
};

export default Sidebar;
