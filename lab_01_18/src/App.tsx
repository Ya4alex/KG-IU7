import "./App.css";

import Topbar from "./components/bars/Topbar";
import Sidebar from "./components/bars/Sidebar";
import MainFrame from "./components/MainFrame";

import usePoints from "./hooks/usePoint"; // Здесь ошибка в имени хука, оно должно быть usePoints
import useResult from "./hooks/useResult";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useColorScheme } from "./hooks/color"; 
function App() {
  const bluePoints = usePoints("blue");
  const redPoints = usePoints("red");
  const result = useResult();
  const { isDark, setIsDark, plt } = useColorScheme();

  return (
    <ThemeProvider value={{ isDark, setIsDark, plt }}>
      <Topbar />
      <Sidebar bluePoints={bluePoints} redPoints={redPoints} result={result} />
      <MainFrame bluePoints={bluePoints} redPoints={redPoints} result={result} />
    </ThemeProvider>
  );
}

export default App;
