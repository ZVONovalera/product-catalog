import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [f, setF] = useState({ name: '', price: '', category: '' });

  const load = () => fetch('/api/products').then(r => r.json()).then(setList);
  useEffect(() => load(), []);

  const add = e => {
    e.preventDefault();
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...f, price: +f.price })
    }).then(() => { setF({ name:'', price:'', category:'' }); load(); });
  };

  const del = id => fetch(`/api/products/${id}`, {method: 'DELETE'}).then(load);

  return (
    <div className="container">
      <h1>Каталог товаров</h1>
      <form onSubmit={add} className="form">
        <input placeholder="Название" value={f.name} onChange={e=>setF({...f,name:e.target.value})} required />
        <input type="number" placeholder="Цена" value={f.price} onChange={e=>setF({...f,price:e.target.value})} required />
        <input placeholder="Категория" value={f.category} onChange={e=>setF({...f,category:e.target.value})} required />
        <button>Добавить</button>
      </form>
      <div className="grid">
        {list.map(p => (
          <div key={p.id} className="card">
            <h3>{p.name}</h3>
            <p>{p.price} ₽ • {p.category}</p>
            <p style={{color: p.inStock?'green':'red'}}>{p.inStock?'В наличии':'Нет'}</p>
            <button onClick={()=>del(p.id)} className="del">Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;