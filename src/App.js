import './App.css';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <div className="App">
        <h1 style={{ textAlign: 'center', color:'#58616b'}}>KANBAN BOARD</h1>
        <KanbanBoard />
    </div>
  );
}

export default App;
