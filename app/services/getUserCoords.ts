export function getCoords(): Promise<{ lat: number; lon: number }> {
  const config = {
    enableHighAccuracy: false,
    timeout: 15000,
    maximumAge: 0,
  };
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(err),
      config,
    );
  });
}
