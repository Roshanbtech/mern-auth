import React from 'react';
import BubbleText from '../components/BubbleText';
import Header from '../components/Header.jsx';
import ParticleRing from '../components/ParticleRing.jsx';

export default function About() {
  return (
    <>
      {/* Add the header */}
      <Header />

      {/* Add the ParticleRing as the background */}
      <div className="relative">
        <ParticleRing />
        
       
      </div>
    </>
  );
}
