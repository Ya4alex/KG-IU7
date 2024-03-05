import "./App.css";

import Topbar from "./components/bars/Topbar.jsx";
import Sidebar from "./components/bars/Sidebar.jsx";
import MainFrame from "./components/MainFrame.jsx";

import usePoints from "./hooks/usePoint.js";
import useResult from "./hooks/useResult.js";

import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { useColorScheme } from "./hooks/color.js";

function App() {
  const bluePoints = usePoints("blue");
  const redPoints = usePoints("red");
  const result = useResult();
  const { isDark, setIsDark, plt } = useColorScheme();

  return (
    <ThemeProvider value={{ isDark, setIsDark, plt }}>
      <Topbar></Topbar>
      <Sidebar bluePoints={bluePoints} redPoints={redPoints} result={result}></Sidebar>
      <MainFrame bluePoints={bluePoints} redPoints={redPoints} result={result}></MainFrame>
    </ThemeProvider>
  );
}

export default App;
