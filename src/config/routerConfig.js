import Inicio from "./pages/Inicio";
import Calendario from "./pages/Calendario";
import Resultados from "./pages/Resultados";
import Clasificacion from "./pages/Clasificacion";
import Draft from "./pages/Draft";
import FichaPartido from "./pages/FichaPartido";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

const routerConfig = [
  { path: "/", element: <Inicio /> },
  { path: "/calendario", element: <Calendario /> },
  { path: "/resultados", element: <Resultados /> },
  { path: "/clasificacion", element: <Clasificacion /> },
  { path: "/draft", element: <Draft /> },
  { path: "/partido", element: <FichaPartido /> },
  { path: "/contacto", element: <Contacto /> },
  { path: "*", element: <NotFound /> },
];

export default routerConfig;
