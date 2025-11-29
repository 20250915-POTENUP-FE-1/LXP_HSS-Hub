import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { useEffect } from 'react';
import { onAuthStateChanged, User as AuthUser } from 'firebase/auth';
import { auth } from './firebase/config';
import { getUser } from './services/userService';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from './store/userSlice';
import { User } from 'types/types';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user: AuthUser | null) => {
        if (user) {
          const result: User = await getUser(user.uid);
          dispatch(setUser(result));
        } else {
          dispatch(clearUser());
        }
      },
    );
    return () => unsubscribe();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
