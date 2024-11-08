import React from 'react';

const Footer = () => {
  return (
    <footer className="h-[200px] border-t border-slate-500 dark:bg-gray-900 py-4">
      <div className="p-6 text-center">
        <hr className="h-px my-4 bg-gray-200 border-none" />
        
        <p className="text-gray-500 dark:text-gray-400">
          Escuela Técnica N°7 D. E. 5 "Dolores Lavalle de Lavalle"
        </p>

        <hr className="h-px my-4 bg-gray-200 border-none dark:bg-gray-700" />
      </div>
    </footer>
  );
};

export default Footer;
