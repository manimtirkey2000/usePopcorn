import { useState, useEffect } from "react";

const KEY = "c0916c64";

export default function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);
  useEffect(() => {
    callback?.(); // Call the callback function if provided
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError(""); // Reset error state before fetching
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, // Use the query state variable
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error(data.Error || "No movies found");
        }
        setMovies(data.Search);
        setError(""); // Reset error state on successful fetch
      } catch (error) {
        console.error("Error fetching movies:", error.message);
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]); // Reset movies if query is empty
      setError("");
      return; // Exit early if no query
    }
    // handleClosedMovie();
    fetchMovies();
    return () => {
      controller.abort(); // Cleanup fetch on component unmount or query change
    };
  }, [query]);
  return { movies, isLoading, isError };
}
