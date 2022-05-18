import React from "react";

function Snake({ snakeDots }) {
  return (
    <div>
      {snakeDots.map((dot, index) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        };
        return <div key={index} className="snake-dot" style={style}></div>;
      })}
    </div>
  );
}
export default Snake;
