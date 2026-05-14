import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

export default function App() {
  const [price, setPrice] = useState(500);

  const products = [
    { id: 1, name: "Tênis Nike Air", price: 350 },
    { id: 2, name: "Camiseta Adidas", price: 120 },
    { id: 3, name: "Jaqueta Streetwear", price: 600 },
    { id: 4, name: "Relógio Digital", price: 250 },
    { id: 5, name: "Headset Gamer RGB", price: 800 },
  ];

  const format = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const filtered = products.filter((p) => p.price <= price);

  return (
    <div className="page">
      <div className="container">
        <h1>🍿 Mini Loja</h1>
        <p className="subtitle">Estilo catálogo Netflix com animações</p>

        <div className="price-box">
          <span>R$0</span>
          <strong>{format(price)}</strong>
          <span>R$1000</span>
        </div>

        <input
          type="range"
          min="0"
          max="1000"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="slider"
        />

        <motion.div layout className="products">
          <AnimatePresence>
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                className="card"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.08 }}
              >
                <div className="badge">🔥</div>
                <h3>{p.name}</h3>
                <p>{format(p.price)}</p>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="empty"
            >
              Nenhum produto nessa faixa 😢
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}