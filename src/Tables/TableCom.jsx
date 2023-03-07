import React, { useEffect, useState } from "react";
import styles from "./TableCom.module.css";
const TableCom = () => {
  const [table, setTable] = React.useState("");
  const [ans, setAns] = React.useState("");
  const [rand, setRand] = React.useState(0);
  const [status, setStatus] = React.useState(0);
  const [sec, setSec] = React.useState(60);
  const [wrongs, setWrongs] = useState([]);
  const handleStart = () => {
    const randomNum = Math.floor(Math.random() * 20) + 1;
    setRand(randomNum);
  };
  const handleans = (event) => {
    setAns(event.target.value);
  };
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      validate();
    }
  };
  const validate = () => {
    let value = rand * table;
    if (value == ans) {
      setStatus((prev) => prev + 1);
    } else {
      alert("wrong answer");
      setStatus((prev) => prev - 1);
      setWrongs((prev) => [...prev, `${rand} * ${table} != ${ans}`]);
    }
    setAns("");
  };
  console.log(wrongs);
  const handleTimer = () => {
    let id = setInterval(() => {
      setSec((prev) => prev - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(id);
      alert("time up");
      setSec(60);
    }, 60000);
  };
  useEffect(() => {
    handleStart();
  }, [status]);

  return (
    <div className={styles.tablesContainer}>
      <input
        type="number"
        placeholder="table"
        max="20"
        min={"2"}
        value={table}
        onChange={(e) => {
          setTable(e.target.value);
        }}
      />{" "}
      <span>*</span>
      <span>{rand}</span>
      <input
        type="text"
        placeholder="answer"
        value={ans}
        onChange={handleans}
        onKeyUp={handleEnter}
      />
      <h2>score : {status}</h2>
      <button onClick={handleTimer}>
              start timer {<label style={{color:sec<=10?"red":"green",fontWeight:"bold",fontSize:sec<=10?"25px":"16px"}}>{sec }</label>} {sec == 0 ? "second" : "seconds"}
      </button>
      {wrongs.length > 0 &&
        wrongs.map((item) => {
          return <h3 style={{ color: "red" }}>{item}</h3>;
        })}
    </div>
  );
};

export default TableCom;
