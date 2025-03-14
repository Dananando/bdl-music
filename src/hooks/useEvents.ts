import axios from "axios";
import { useState } from "react";
import { createEventSearchConfig } from "../config/rapid-api";

interface Event {
  id: number;
  starts_at: string;
  timezone: string;
  venue_id: number;
  title: string | null;
  image: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (artistName: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.request(
        createEventSearchConfig({ keyword: artistName })
      );
      const sortedEvents = response.data.events.sort(
        (a: Event, b: Event) =>
          new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime()
      );
      setEvents(sortedEvents);
    } catch (error) {
      setError("Failed to fetch events");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
  };
};
