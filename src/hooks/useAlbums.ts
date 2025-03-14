import axios from "axios";
import { useEffect, useState } from "react";
import { Album } from "../types/album";

const API_URL = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";

export const useAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  // TODO - Create a hook for the search term, loading state, and error state
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(API_URL);
        setAlbums(response.data.feed.entry);
      } catch (error) {
        setError("Failed to fetch albums");
        console.error("Error fetching albums:", error);
        // TODO - Insert error handling here - display error message to user with snackbar ?
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

  return {
    albums: filteredAlbums,
    loading,
    error,
    searchTerm,
    setSearchTerm,
  };
};
