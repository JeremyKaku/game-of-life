import React from "react";
import { Link } from 'react-router-dom';
import { Banner } from '../components/Banner'

export default function Home() {
  return (
    <div>
      <Banner />
      {/* <Link to="/grid">Start the game!</Link> */}
    </div>
  )
}