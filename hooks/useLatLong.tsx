'use client'
import { useEffect, useState } from "react";

export function useLatLong() {
  const [latitude, setLatitude] = useState(-1);
  const [longitude, setLongitude] = useState(-1);
  const [watchId, setWatchId] = useState<number | null>(null);
 
  useEffect(() => {
    let currentWatchId: number | null = null;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
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
              }
              if (newAccuracy <= 100) {
                navigator.geolocation.clearWatch(currentWatchId!);
              }
            },
            (error) => {
              console.error("watchPosition error:", error);
              
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
          currentWatchId = navigator.geolocation.watchPosition(
            (newPosition) => {
              const {
                latitude: newLat,
                longitude: newLng,
                accuracy: newAccuracy,
              } = newPosition.coords;

              if (newAccuracy <= 10) {
                navigator.geolocation.clearWatch(currentWatchId!);

              }
            },
            (error) => {
              console.error("watchPosition error:", error);
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
      setWatchId(null);
    }
  };

  return {
    latitude,
    longitude,
  };
}
