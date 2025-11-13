import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { getUser } from './services/userService';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const result = await getUser(user.uid);
        dispatch(setUser(result));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
