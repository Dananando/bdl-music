import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useEvents } from "../../hooks/useEvents";
import { Album } from "../../types/album";
import { EventModal } from "./EventModal";

interface AlbumCardProps {
  album: Album;
}

export const AlbumCard = ({ album }: AlbumCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { events, loading, error, fetchEvents } = useEvents();

  const handleViewEvents = useCallback(async () => {
    await fetchEvents(album["im:artist"].label);
    onOpen();
  }, [album, fetchEvents, onOpen]);

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        height="100%"
        display="flex"
        flexDirection="column"
      >
        <Box p={4} flex="1" display="flex" flexDirection="column">
          <Image
            src={album["im:image"][2].label}
            alt={album["im:name"].label}
            borderRadius="lg"
            width="100%"
            height="auto"
          />
          <VStack mt={4} align="start" spacing={3} flex="1">
            <Box flex="1">
              <Heading size="md" mb={2}>
                {album["im:name"].label}
              </Heading>
              <Text color="gray.600">{album["im:artist"].label}</Text>
            </Box>
            <Button
              colorScheme="blue"
              size="sm"
              onClick={handleViewEvents}
              width="full"
              mt="auto"
            >
              View Events
            </Button>
          </VStack>
        </Box>
      </Box>

      <EventModal
        isOpen={isOpen}
        onClose={onClose}
        artistName={album["im:artist"].label}
        event={events[0]}
        loading={loading}
        error={error}
      />
    </>
  );
};
