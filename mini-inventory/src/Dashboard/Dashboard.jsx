import React from 'react';
import './DashStyle.css'
import pro1 from '../assets/pro1.png'
import InventoryControl from '../assets/InventoryControl.webp'
import featureBanner from '../assets/featurebanner.png'

const Dashboard = () => {
  return (
    <div>
      <header>
        <div className="container headwala">
          <div className="logo">
            <a href="#"><img src={pro1} alt="Logo" /></a>
          </div>
          <ul className="Menu">
            <li><a href="/Registration">Register</a></li>
            <li><a href="/Login">Login</a></li>
          </ul>
        </div>
      </header>
      <div className="container banner">
        <div className="txt">
          <h1>Inventory & stock management solution</h1>
          <p>
            Inventory system to control and manage products in the warehouse in real time and integrated to make it
            easier to develop your business.
          </p>
          <a className="trial" href="#">Free Trial 1 Month</a>
          <div className="infowala">
            <div className="info">
              <h3>14k</h3>
              <strong>Brand Owners</strong>
            </div>
            <div className="info">
              <h3>23k</h3>
              <strong>Active Users</strong>
            </div>
            <div className="info">
              <h3>500+</h3>
              <strong>Partners</strong>
            </div>
          </div>
        </div>
        <div className="photos">
          <img className="pic1" src={InventoryControl} alt="Inventory Control" />
          <img className="pic2" src={featureBanner} alt="Feature Banner" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
