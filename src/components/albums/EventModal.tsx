import {
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
  event?: {
    starts_at: string;
    timezone: string;
    title: string | null;
    image: string;
  };
  loading: boolean;
  error: string | null;
}

export const EventModal = ({
  isOpen,
  onClose,
  artistName,
  event,
  loading,
  error,
}: EventModalProps) => {
  const getLocationFromTimezone = (timezone: string) => {
    const [, location] = timezone.split("/");
    return location.replace(/_/g, " ");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Next Event for {artistName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {loading && (
            <Center py={8}>
              <Spinner size="xl" />
            </Center>
          )}

          {error && <Text color="red.500">{error}</Text>}

          {!loading && !error && event && (
            <VStack align="stretch" spacing={4}>
              <Image
                src={event.image}
                alt={`${artistName} event`}
                borderRadius="lg"
              />
              <Text fontWeight="bold">
                {event.title || `${artistName} Concert`}
              </Text>
              <Text>Date: {format(new Date(event.starts_at), "PPpp")}</Text>
              <Text>Location: {getLocationFromTimezone(event.timezone)}</Text>
            </VStack>
          )}

          {!loading && !error && !event && (
            <Text>No upcoming events found.</Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
