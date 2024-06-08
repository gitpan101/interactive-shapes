import { useCallback, useEffect, useRef, useState } from 'react';

const InteractiveShapes = ({ BOX_DATA: twoDArr }) => {
  const [queue, setQueue] = useState([]);
  const [arrColorData, setAColorData] = useState(twoDArr.map((arr) => (ele) => false));
  const maxLength = useRef(0);
  const [gripTemplateCols, setGTC] = useState(null);

  const animate = useCallback(
    (i, queue) => {
      setTimeout(() => {
        let front = queue.shift();
        let temp = [...arrColorData];
        temp[front.row][front.col] = false;

        setAColorData(temp);
      }, i * 1000);
    },
    [arrColorData]
  );

  useEffect(() => {
    let count = 0;
    for (let i = 0; i < twoDArr.length; i++) {
      for (let j = 0; j < twoDArr[0].length; j++) {
        if (twoDArr[i][j] === 1) count += 1;
      }
    }

    setGTC(twoDArr[0].reduce((accu, curr) => accu + '60px ', ''));
    maxLength.current = count;
  }, [twoDArr, setGTC]);

  useEffect(() => {
    if (queue.length !== 0 && queue.length === maxLength.current) {
      const tempQ = [...queue];
      for (let i = 1; i <= queue.length; i++) {
        animate(i, tempQ);
      }

      setQueue([]);
    }
  }, [queue, animate]);

  const fillColor = (row, col) => {
    if (arrColorData[row][col]) return;

    let temp = [...arrColorData];
    temp[row][col] = true;

    setAColorData(temp);
    setQueue((queue) => [
      ...queue,
      {
        row,
        col,
      },
    ]);
  };

  return (
    gripTemplateCols &&
    twoDArr.map((arr, row) => (
      <div
        key={row}
        style={{
          display: 'grid',
          gridTemplateColumns: gripTemplateCols,
        }}
      >
        {arr.map((ele, col) => (
          <div
            key={col}
            style={{
              width: '50px',
              height: '50px',
              border: `1px solid ${ele === 1 ? 'grey' : 'transparent'}`,
              marginBottom: '10px',
              background: arrColorData[row] && arrColorData[row][col] ? 'lightgreen' : '#fff',
            }}
            onClick={() => fillColor(row, col)}
          ></div>
        ))}
      </div>
    ))
  );
};

export default InteractiveShapes;
