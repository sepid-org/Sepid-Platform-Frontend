import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import PrivateRoute from 'commons/routes/PrivateRoute';
import TeamSetting from './pages/TeamSetting';
import Registration from './pages/Registration';
import ProgramManagement from './pages/ProgramManagement';
import NotFoundPage from 'commons/pages/NotFoundPage';
import Program from './pages/Program';
import FilmBaziApp from 'apps/film-bazi/App'
import AshbariaApp from 'apps/ashbaria/App'

const App = () => {
  const { programSlug } = useParams();

  if (programSlug === 'filmbazi') {
    return <FilmBaziApp />
  }

  if (programSlug === 'ashbaria') {
    return <AshbariaApp />
  }

  return (
    <Routes>
      <Route path='/' element={<Program />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/form/" element={<Registration />} />
        <Route path="/team-setting/" element={<TeamSetting />} />
        <Route path="/manage/" element={<ProgramManagement />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
