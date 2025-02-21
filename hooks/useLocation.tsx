"use client";
import { useEffect, useState } from "react";

export function useLocation() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("Getting location...");
  const [location, setLocation] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  // Function to fetch location name from OpenStreetMap
  const fetchLocation = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      if (!response.ok) throw new Error("Failed to fetch location");

      const data = await response.json();
      setLocation(data.display_name?.split(",")[0] || "Unknown location");
    } catch (error) {
      console.error("Error fetching location:", error);
      setLocation("Error fetching location");
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }

    const updateLocation = (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      setAccuracy(accuracy);
      setStatus(`Accuracy: ±${accuracy.toFixed(2)} meters`);
      fetchLocation(latitude, longitude);
    };

    const handleError = (error: GeolocationPositionError) => {
      console.error("Geolocation error:", error);
      setStatus(`Error: ${error.message}`);
    };

    navigator.geolocation.getCurrentPosition(updateLocation, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 2000,
    });

    const id = navigator.geolocation.watchPosition(
      updateLocation,
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 2000,
      }
    );

    setWatchId(id);

    return () => {
      if (id !== null) navigator.geolocation.clearWatch(id);
    };
  }, []);

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setStatus("Tracking stopped.");
      setWatchId(null);
    }
  };

  return { latitude, longitude, accuracy, status, location, stopTracking };
}
