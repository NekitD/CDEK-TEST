import './App.css';
import NewsComponent from './component/news';

function App() {
  return (
    <div className="App">
      <NewsComponent pageNum={1}/>
    </div>
  );
}

export default App;
