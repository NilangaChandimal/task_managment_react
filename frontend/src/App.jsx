import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewPage from './components/MainPage/ViewPage';
import EditTaskView from './components/EditTask';

function App() {
  return (
    
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Task Manager</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewPage />} />
          <Route path="/edit" element={<EditTaskView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
