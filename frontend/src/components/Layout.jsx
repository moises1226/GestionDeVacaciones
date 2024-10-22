import React from 'react';

const Layout = (props) => {
  return (
    <section className="flex-grow"> 
      {props.children}
    </section>
  );
}

export default Layout;
