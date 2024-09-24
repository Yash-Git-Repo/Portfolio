import { useTheme } from "./theme-provider";

const TestComponent = () => {
    const { theme, setTheme } = useTheme();
  
    return (
      <div>
        <p>The current theme is {theme}</p>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          Toggle Theme
        </button>
      </div>
    );
  };
  
  export default TestComponent;
  