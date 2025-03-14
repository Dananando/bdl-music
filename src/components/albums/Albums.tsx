import {
  Box,
  Center,
  Grid,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAlbums } from "../../hooks/useAlbums";
import { AlbumCard } from "./AlbumCard";

export const Albums = () => {
  const { albums, loading, error, searchTerm, setSearchTerm } = useAlbums();

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="50vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Stack align="stretch" direction="column" spacing={6}>
      <Box position="relative">
        <Input
          placeholder="Search albums or artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="lg"
        />
      </Box>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {albums.map((album, index) => (
          <AlbumCard key={index} album={album} />
        ))}
      </Grid>
    </Stack>
  );
};
