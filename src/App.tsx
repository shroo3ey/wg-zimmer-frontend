import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { RoomDetailPage } from './pages/RoomDetailPage';
import { useFavorites } from './hooks/useFavorites';

function App() {
  const { favoriteCount } = useFavorites();

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={
          <>
            <Header favoriteCount={favoriteCount} />
            <HomePage />
          </>
        } />
        <Route path="/room/:id" element={<RoomDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
