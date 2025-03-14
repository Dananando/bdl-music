import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Album } from "../../types/album";

interface AlbumCardProps {
  album: Album;
}

export const AlbumCard = ({ album }: AlbumCardProps) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
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
  );
};
