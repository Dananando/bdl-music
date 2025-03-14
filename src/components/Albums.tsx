import { SearchIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Center,
  Grid,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Album {
  "im:name": { label: string };
  "im:artist": { label: string };
  "im:image": Array<{ label: string; attributes: { height: string } }>;
  "im:price": { label: string };
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching albums:", error);
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
    <VStack spacing={6} align="stretch">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search albums or artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="lg"
        />
      </InputGroup>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {filteredAlbums.map((album, index) => (
          <Card key={index} overflow="hidden" variant="outline">
            <CardBody>
              <Image
                src={album["im:image"][2].label}
                alt={album["im:name"].label}
                borderRadius="lg"
                width="100%"
                height="auto"
              />
              <VStack mt={4} align="start" spacing={2}>
                <Heading size="md" noOfLines={2}>
                  {album["im:name"].label}
                </Heading>
                <Text color="gray.600">{album["im:artist"].label}</Text>
                <Text color="gray.500">{album["im:price"].label}</Text>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </VStack>
  );
}

export default Albums;
