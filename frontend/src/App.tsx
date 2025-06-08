import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { NotesList } from './pages/NotesList';
import { NoteEditor } from './pages/NoteEditor';
import { PrivateRoute } from './components/common/PrivateRoute';
import { useThemeStore } from './store/theme.store';

const App = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', theme);
  }, [theme]);
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="notes" element={<PrivateRoute />}>
              <Route index element={<NotesList />} />
              <Route path="new" element={<NoteEditor />} />
              <Route path=":id" element={<NoteEditor />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
