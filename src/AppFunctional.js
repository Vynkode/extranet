import React, { useEffect, useState } from 'react';

const AppFunctional = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [route, setRoute] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [widthWindow, setWidthWindow] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    setWidthWindow(
      window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
    );
    window.addEventListener('resize', () => {
      setWidthWindow(
        window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth
      );
      return () =>
        window.removeEventListener('resize', () => {
          setWidthWindow(
            window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth
          );
        });
    });
  }, []);

  return <div>{widthWindow}</div>;
};

export default AppFunctional;
