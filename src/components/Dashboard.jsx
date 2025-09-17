import React, { useEffect, useState } from "react";
import dashboardData from "../dashboard.json";
import "../App.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => setData(dashboardData), 500); // simulate fetch delay
  }, []);

  return (
    <div className="dashboard">
      <h2>Sales Dashboard</h2>

      <div className="dashboard-content">
        <div className="chart-section">
          <h3>Sales by Customer</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="customer" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total_price" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Total Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((sale) => (
                <tr key={sale.order_id}>
                  <td>{sale.customer_id}</td>
                  <td>{sale.product_id}</td>
                  <td>${sale.total_price}</td>
                  <td>{sale.order_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
