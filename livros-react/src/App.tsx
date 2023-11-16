import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LivroLista from './LivroLista';
import { LivroDados } from './LivrosDados';
import { NavBar } from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LivroLista />} />
        <Route path="/dados" element={<LivroDados />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
