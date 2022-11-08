import * as React from 'react';
import "swiper/swiper.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";
import Router from "./Router";

const App = () => (
  <>
    <Navbar />
    <Router />
    <Footer />
  </>
);

export default App;
