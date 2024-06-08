import './App.css';
import InteractiveShapes from './InteractiveShapes';

function App() {
  const BOX_DATA = [
    [1, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 1],
  ];

  return (
    <div className="App">
      <InteractiveShapes BOX_DATA={BOX_DATA} />
    </div>
  );
}

export default App;
