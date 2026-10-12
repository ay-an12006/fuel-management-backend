import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8080/api/fuel-records";

function App() {
  const [records, setRecords] = useState([]);
  const [fuelType, setFuelType] = useState("Petrol");
  const [litres, setLitres] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  async function loadRecords() {
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error();
      setRecords(await response.json());
    } catch {
      setMessage("Cannot connect to backend. Is Spring Boot running?");
    }
  }

  useEffect(() => {
    loadRecords();
  }, []);

  const totalSpent = records.reduce(
    (sum, r) => sum + Number(r.litres) * Number(r.pricePerLitre), 0
  );

  const totalLitres = records.reduce(
    (sum, r) => sum + Number(r.litres), 0
  );

  async function addRecord(event) {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fuelType,
          litres: Number(litres),
          pricePerLitre: Number(price),
          purchaseDate: date
        })
      });

      if (!response.ok) throw new Error();

      setMessage("Fuel record saved successfully!");
      setLitres("");
      setPrice("");
      setDate("");
      await loadRecords();
    } catch {
      setMessage("Could not save record. Check Spring Boot and MySQL.");
    }
  }

  const rupees = value =>
    "₹" + Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  return (
    <div className="app">
      <header className="header">
        <div className="brand">⛽ FuelTrack</div>
        <div>
          <h1>Find Out Where Your Fuel Money Goes</h1>
          <p>Track your fuel purchases and spending in one place.</p>
        </div>
      </header>

      <main className="container">
        <h2>Dashboard</h2>
        <section className="stats">
          <div className="stat-card">
            <span>Total Money Spent</span>
            <h2>{rupees(totalSpent)}</h2>
          </div>
          <div className="stat-card">
            <span>Total Fuel Purchased</span>
            <h2>{totalLitres.toFixed(2)} L</h2>
          </div>
          <div className="stat-card">
            <span>Total Purchases</span>
            <h2>{records.length}</h2>
          </div>
        </section>

        <section className="panel">
          <h2>＋ Add Fuel Purchase</h2>
          <form onSubmit={addRecord} className="fuel-form">
            <div>
              <label>Fuel Type</label>
              <select value={fuelType}
                onChange={e => setFuelType(e.target.value)}>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>CNG</option>
                <option>Electric</option>
              </select>
            </div>

            <div>
              <label>Quantity (litres)</label>
              <input type="number" min="0.01" step="any"
                value={litres} onChange={e => setLitres(e.target.value)}
                required />
            </div>

            <div>
              <label>Price per litre (₹)</label>
              <input type="number" min="0.01" step="any"
                value={price} onChange={e => setPrice(e.target.value)}
                required />
            </div>

            <div>
              <label>Purchase Date</label>
              <input type="date" value={date}
                onChange={e => setDate(e.target.value)} required />
            </div>

            <button type="submit">Save Fuel Record</button>
          </form>
          {message && <p className="message">{message}</p>}
        </section>

        <section className="panel">
          <h2>Fuel Purchase History</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fuel Type</th>
                  <th>Litres</th>
                  <th>Price/Litre</th>
                  <th>Total Cost</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {records.map(r => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.fuelType}</td>
                    <td>{Number(r.litres).toFixed(2)}</td>
                    <td>{rupees(r.pricePerLitre)}</td>
                    <td>{rupees(r.litres * r.pricePerLitre)}</td>
                    <td>{r.purchaseDate}</td>
                  </tr>
                ))}
                {records.length === 0 && (
                  <tr>
                    <td colSpan="6">No fuel purchases found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer>FuelTrack · React + Spring Boot + MySQL</footer>
    </div>
  );
}

export default App;