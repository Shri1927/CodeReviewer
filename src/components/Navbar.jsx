import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BrainCircuit, ArrowLeft } from 'lucide-react';

// This function returns a Navbar component
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBackToLanding = () => {
    navigate('/');
  };

  // Return a JSX element
  return (
    <>
      <div className="nav flex items-center justify-between h-[90px] bg-zinc-900" style={{padding:"0px 150px"}}>
        <div className="logo flex items-center gap-[10px]">
          {location.pathname === '/editor' && (
            <button 
              onClick={handleBackToLanding}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mr-4"
            >
              <ArrowLeft size={20} />
              <span className="text-sm">Back to Home</span>
            </button>
          )}
          <BrainCircuit size={30} color='#9333ea'/>
          <span className="text-2xl font-bold text-white ml-2">Codeify</span>
        </div>
        <div className="icons flex items-center gap-[20px]">
          {/* Removed dark/light switch as requested */}
        </div>
      </div>
    </>
  )
}

export default Navbar