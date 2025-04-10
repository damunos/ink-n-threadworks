import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; // Ensure the import path is correct
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "./Admin.css";

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    minAmount: "",
    maxAmount: "",
    product: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(collection(db, "orders"), orderBy("datePlaced", "desc"));
      const querySnapshot = await getDocs(q);
      const ordersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
    };

    fetchOrders();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredOrders = orders.filter((order) => {
    const dateMatch = filters.date ? order.datePlaced.includes(filters.date) : true;
    const minAmountMatch = filters.minAmount ? order.amount >= parseFloat(filters.minAmount) : true;
    const maxAmountMatch = filters.maxAmount ? order.amount <= parseFloat(filters.maxAmount) : true;
    const productMatch = filters.product ? order.product.toLowerCase().includes(filters.product.toLowerCase()) : true;
    return dateMatch && minAmountMatch && maxAmountMatch && productMatch;
  });

  return (
    <div className="admin-page">
      <h2>Admin Panel</h2>
      <div className="filters">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          placeholder="Filter by Date"
        />
        <input
          type="number"
          name="minAmount"
          value={filters.minAmount}
          onChange={handleFilterChange}
          placeholder="Min Amount"
        />
        <input
          type="number"
          name="maxAmount"
          value={filters.maxAmount}
          onChange={handleFilterChange}
          placeholder="Max Amount"
        />
        <input
          type="text"
          name="product"
          value={filters.product}
          onChange={handleFilterChange}
          placeholder="Filter by Product"
        />
      </div>
      <div className="orders-list">
        {filteredOrders.map((order) => (
          <div key={order.id} className="order-item">
            <p>Date Placed: {order.datePlaced}</p>
            <p>Amount: ${order.amount}</p>
            <p>Product: {order.product}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;