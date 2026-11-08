export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 520;

// Convert latitude and longitude to SVG coordinates (Miller-like cylindrical projection)
export function projectCoords(lat: number, lng: number): [number, number] {
  // Normalize longitude to [-180, 180]
  let normalizedLng = lng;
  while (normalizedLng > 180) normalizedLng -= 360;
  while (normalizedLng < -180) normalizedLng += 360;

  const x = ((normalizedLng + 180) / 360) * MAP_WIDTH;

  // Clamp latitude to [-80, 80] to avoid infinite projection scale
  const clampedLat = Math.max(-80, Math.min(80, lat));
  // Miller cylindrical projection formula
  const phi = (clampedLat * Math.PI) / 180;
  // Miller uses 0.8 * phi
  const yVal = Math.log(Math.tan(Math.PI / 4 + 0.4 * phi));
  // Standard range for phi in [-80, 80] with 0.8 factor
  const maxLatRad = (80 * Math.PI) / 180;
  const maxY = Math.log(Math.tan(Math.PI / 4 + 0.4 * maxLatRad));
  const normalizedY = 0.5 - (0.5 * yVal) / maxY;
  const y = normalizedY * MAP_HEIGHT;

  return [x, y];
}

// Convert screen/canvas coordinates back to lat/lng for click handling
export function unprojectCoords(x: number, y: number): [number, number] {
  const lng = (x / MAP_WIDTH) * 360 - 180;
  const normalizedY = (y / MAP_HEIGHT - 0.5) * -2;
  const maxLatRad = (80 * Math.PI) / 180;
  const maxY = Math.log(Math.tan(Math.PI / 4 + 0.4 * maxLatRad));
  const yVal = normalizedY * maxY;
  const phi = (Math.atan(Math.exp(yVal)) - Math.PI / 4) / 0.4;
  const lat = (phi * 180) / Math.PI;
  return [lat, lng];
}

// Haversine formula for real great-circle distance between two GPS coordinates
export function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's mean radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Speed of light in single mode silica optical fiber
// c_vacuum = 299,792.458 km/s
// refractive index of silica n ≈ 1.4682
// v_fiber = c / n ≈ 204,190 km/s
export const SPEED_OF_LIGHT_FIBER_KM_S = 204190;
export const SPEED_OF_LIGHT_VACUUM_KM_S = 299792;

export function calculateOpticalPropagationDelayMs(distanceKm: number): {
  oneWayMs: number;
  rttMs: number;
  repeatersEstimate: number;
} {
  // Add ~15% margin for terrestrial backhaul & optical dispersion compensation
  const totalPhysicalPathKm = distanceKm * 1.15;
  const oneWayMs = (totalPhysicalPathKm / SPEED_OF_LIGHT_FIBER_KM_S) * 1000;
  const rttMs = oneWayMs * 2;
  const repeatersEstimate = Math.max(1, Math.floor(distanceKm / 75));

  return {
    oneWayMs: Number(oneWayMs.toFixed(1)),
    rttMs: Number(rttMs.toFixed(1)),
    repeatersEstimate
  };
}

// Generates smooth SVG path string from an array of [lat, lng] points
export function createSmoothSvgPath(
  coords: Array<[number, number]>,
  wrapBreakThreshold: number = 400
): string[] {
  if (coords.length < 2) return [];

  const projectedPoints = coords.map(([lat, lng]) => projectCoords(lat, lng));
  const pathSegments: string[] = [];
  let currentSegment: Array<[number, number]> = [projectedPoints[0]];

  for (let i = 1; i < projectedPoints.length; i++) {
    const prev = projectedPoints[i - 1];
    const curr = projectedPoints[i];

    // Check if line crosses the map boundary (e.g. from +170 to -170 in Pacific)
    if (Math.abs(curr[0] - prev[0]) > wrapBreakThreshold) {
      if (currentSegment.length > 1) {
        pathSegments.push(generateCatmullRomSvg(currentSegment));
      }
      currentSegment = [curr];
    } else {
      currentSegment.push(curr);
    }
  }

  if (currentSegment.length > 1) {
    pathSegments.push(generateCatmullRomSvg(currentSegment));
  }

  return pathSegments;
}

// Helper to generate smooth curve through points
function generateCatmullRomSvg(points: Array<[number, number]>): string {
  if (points.length === 2) {
    return `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)} L ${points[1][0].toFixed(1)} ${points[1][1].toFixed(1)}`;
  }

  let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i === 0 ? points[0] : points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i + 2 < points.length ? points[i + 2] : p2;

    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }

  return d;
}
