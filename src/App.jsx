import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./components/Header/index";
import Footer from "./components/Footer/index";

// Lazy loading das páginas
const Home = lazy(() => import("./pages/Home/index"));
const Sobre = lazy(() => import("./pages/Sobre/index"));
const Cardapio = lazy(() => import("./pages/Cardapio/index"));
const Carrinho = lazy(() => import("./pages/Carrinho/index"));

function App() {
  return (
    <div className="app">
      <Header />

      <main className="content">
        <Suspense fallback={<div className="loading">Carregando...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/cardapio" element={<Cardapio />} />
            <Route path="/carrinho" element={<Carrinho />} />

            {/* fallback de rota */}
            <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;