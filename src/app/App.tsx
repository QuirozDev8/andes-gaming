import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import { appRoutes } from "../routes/appRoutes";

function App() {
  return (
    <MainLayout>
      <Routes>
        {appRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </MainLayout>
  );
}

export default App;
