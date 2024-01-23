import React from "react";

const Instructions = ({ setScene }) => {
  const instructionsText = `
   1. Tap the screen or left 
     click on mouse to jump.

   2. Avoid falling into the
     void.

   3. Get as high a score as 
     possible!

   4. The score is increased by 1 
     every second and every 
     platform you land on.

   5. Collect coffee beans for
     bonus points!
  `;

  return (
    <div>
      <h1>Game Instructions</h1>
      <p>{instructionsText}</p>
      <button onClick={() => setScene("start")}>Back</button>
    </div>
  );
};

export default Instructions;
