import React from 'react';

const Layout = ({ children }) => {
  return (
    <section className="flex-grow">
        {children}
    </section>
  );
}

export default Layout;
