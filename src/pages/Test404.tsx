
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const Test404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-6xl font-bold text-gradient mb-6">404 Test Page</h1>
        <p className="text-xl text-foreground/70 mb-8">
          This is a test page to verify 404 handling works correctly on Netlify.
        </p>
        
        <div className="space-y-4">
          <p className="text-foreground/60 mb-6">
            Try navigating to a non-existent page like <code>/non-existent-page</code> to test the 404 functionality.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/non-existent-page"
              className="px-6 py-3 bg-red-500/20 text-red-400 font-semibold rounded-full hover:bg-red-500/30 transition-all duration-300"
            >
              Test 404 Page
            </Link>
            
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-optra-gradient text-white font-semibold rounded-full hover:scale-105 transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test404;
