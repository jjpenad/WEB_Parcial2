import "./App.css";
import TVSeries from "./components/tvSeries";
import { FormattedMessage } from "react-intl";

function App() {
  return (
    <>
      <header>
        <h1>
          <FormattedMessage id='TVSeries' />
        </h1>
      </header>
      <hr></hr>
      <main>
        <TVSeries></TVSeries>
      </main>
    </>
  );
}

export default App;
