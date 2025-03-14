import {
  Box,
  Center,
  Grid,
  Heading,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Album {
  "im:name": { label: string };
  "im:artist": { label: string };
  "im:image": Array<{ label: string; attributes: { height: string } }>;
}

function Albums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          "https://itunes.apple.com/us/rss/topalbums/limit=100/json"
        );
        setAlbums(response.data.feed.entry);
      } catch (error) {
        console.error("Error fetching albums:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const filteredAlbums = albums.filter(
    (album) =>
      album["im:name"].label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album["im:artist"].label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }
  return (
    <Stack align="stretch" direction="column">
      <Box>
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
          lg: "repeat(6, 1fr)",
        }}
        gap={6}
      >
        {filteredAlbums.map((album, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Box p={4}>
              <Image
                src={album["im:image"][2].label}
                alt={album["im:name"].label}
                borderRadius="lg"
                width="100%"
                height="auto"
              />
              <Stack mt={4} align="start">
                <Heading size="md">{album["im:name"].label}</Heading>
                <Text color="gray.600">{album["im:artist"].label}</Text>
              </Stack>
            </Box>
          </Box>
        ))}
      </Grid>
    </Stack>
  );
}

export default Albums;
