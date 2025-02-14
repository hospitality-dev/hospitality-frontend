import Button from "./components/Button";

function App() {
  return (
    <main>
      <Button label="Stagod" size="xs" variant="primary" />
      <Button label="Stagod" size="sm" variant="secondary" />
      <Button label="Stagod" size="md" variant="success" />
      <Button label="Stagod" size="lg" variant="info" />
      <Button label="Stagod" size="xl" variant="error" />
      <Button isOutline label="Stagod" size="md" variant="warning" />
    </main>
  );
}

export default App;
