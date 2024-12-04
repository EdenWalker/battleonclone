import { atom, useAtom } from 'jotai';

// Atom for JWT
const jwtAtom = atom(null);

// Atom for Username
const usernameAtom = atom(null);

export function useJwt() {
  const [jwt, setJwtAtom] = useAtom(jwtAtom);
  const [username, setUsernameAtom] = useAtom(usernameAtom);

  // Set JWT and store it in localStorage
  const setJwt = (newJwt) => {
    localStorage.setItem('jwt', newJwt);
    setJwtAtom(newJwt);
  };

  // Get JWT, either from state or localStorage
  const getJwt = () => {
    const storedJwt = localStorage.getItem('jwt');
    if (storedJwt && !jwt) {
      setJwtAtom(storedJwt);
    }
    return jwt || storedJwt;
  };

  // Clear JWT from state and localStorage
  const clearJwt = () => {
    localStorage.removeItem('jwt');
    setJwtAtom(null);
  };

  // Set Username
  const setUserName = (newName) => {
    localStorage.setItem('username', newName);
    setUsernameAtom(newName);
  };

  // Get Username
  const getUserName = () => {
    const storedName = localStorage.getItem('username');
    if (storedName && !username) {
      setUsernameAtom(storedName);
    }
    return username || storedName;
  };

  // Clear Username
  const clearUserName = () => {
    localStorage.removeItem('username');
    setUsernameAtom(null);
  };

  return {
    jwt,
    username,
    setJwt,
    getJwt,
    clearJwt,
    setUserName,
    getUserName,
    clearUserName,
  };
}
