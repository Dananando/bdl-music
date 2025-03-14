import { ChakraProvider, Container } from "@chakra-ui/react";
import Albums from "./components/Albums";

function App() {
  return (
    <ChakraProvider>
      <Container maxW="container.xl" py={8}>
        <Albums />
      </Container>
    </ChakraProvider>
  );
}

export default App;
