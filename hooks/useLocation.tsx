'use client';
import { useEffect, useState } from "react";

export function useLocation() {
  const [latitude, setLatitude] = useState(-1);
  const [longitude, setLongitude] = useState(-1);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("Getting location...");
  const [watchId, setWatchId] = useState<number | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const fetchLocation = async ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.display_name) {
        setLocation(data.display_name.split(",")[0]);
      } else {
        setLocation("Location name not found");
      }
    } catch (error: any) {
      console.error("Error fetching location:", error);
      setLocation(`Error fetching location: ${error.message}`);
    }
  };

  useEffect(() => {
    let currentWatchId: number | null = null;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setAccuracy(accuracy);

          setStatus(
            `Location found (accuracy: ±${accuracy.toFixed(2)} meters)`
          );
          fetchLocation({ latitude, longitude });
          console.log(latitude, longitude, accuracy);
          setStatus("Refining location...");
          currentWatchId = navigator.geolocation.watchPosition(
            (newPosition) => {
              const {
                latitude: newLat,
                longitude: newLng,
                accuracy: newAccuracy,
              } = newPosition.coords;

              if (!accuracy || newAccuracy < accuracy) {
                setLatitude(newLat);
                setLongitude(newLng);
                setAccuracy(newAccuracy);
                setStatus(
                  `Location updated (accuracy: ±${newAccuracy.toFixed(
                    2
                  )} meters)`
                );
                console.log(latitude, longitude, accuracy);
                fetchLocation({ latitude: newLat, longitude: newLng });
              }
              if (newAccuracy <= 100) {
                navigator.geolocation.clearWatch(currentWatchId!);
                setStatus(
                  `Final location (accuracy: ±${newAccuracy.toFixed(2)} meters)`
                );
              }
            },
            (error) => {
              console.error("watchPosition error:", error);
              setStatus(`Error refining location: ${error.message}`);
              if (currentWatchId !== null) {
                navigator.geolocation.clearWatch(currentWatchId);
              }
            },
            {
              enableHighAccuracy: true,
              maximumAge: 2000,
              timeout: 45000,
            }
          );
          setWatchId(currentWatchId);
        },
        (error) => {
          console.error("getCurrentPosition error:", error);
          setStatus(`Error getting location: ${error.message}`);
          currentWatchId = navigator.geolocation.watchPosition(
            (newPosition) => {
              const {
                latitude: newLat,
                longitude: newLng,
                accuracy: newAccuracy,
              } = newPosition.coords;

              if (!accuracy || newAccuracy < accuracy) {
                setLatitude(newLat);
                setLongitude(newLng);
                setAccuracy(newAccuracy);
                setStatus(
                  `Location updated (accuracy: ±${newAccuracy.toFixed(
                    2
                  )} meters)`
                );
                fetchLocation({ latitude: newLat, longitude: newLng });
              }
              if (newAccuracy <= 10) {
                navigator.geolocation.clearWatch(currentWatchId!);
                setStatus(
                  `Final location (accuracy: ±${newAccuracy.toFixed(2)} meters)`
                );
              }
            },
            (error) => {
              console.error("watchPosition error:", error);
              setStatus(`Error refining location: ${error.message}`);
              if (currentWatchId !== null) {
                navigator.geolocation.clearWatch(currentWatchId);
              }
            },
            {
              enableHighAccuracy: true,
              maximumAge: 0,
              timeout: 20000,
            }
          );
          setWatchId(currentWatchId);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 2000,
          timeout: 10000,
        }
      );
    } else {
      setStatus("Geolocation not supported");
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const handleStopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setStatus("Location tracking stopped.");
      setWatchId(null);
    }
  };

  return {
    latitude,
    longitude,
    accuracy,
    status,
    location,
    handleStopTracking,
  };
}
