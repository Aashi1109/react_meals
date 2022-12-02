import React from "react";

import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {

  
  const { labelTitle, inputConfig } = props;
  return (
    <div className={styles["input"]}>
      <label htmlFor={inputConfig.id}>{labelTitle}</label>
      <input ref={ref} {...inputConfig} />
    </div>
  );
});

export default Input;
