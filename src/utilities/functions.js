// transform degree to rad
export const angleToRadians = (angle) => (Math.PI / 180) * angle;

// return the position depending on the distance and the angle of rotation
export const circularMovement = (distance, angle) => {
  return [distance * Math.cos(angle), 0, distance * Math.sin(angle)];
};

// return the period that takes the planet to finish one complete rotation around the sun
export const period = (distance, sunMass) =>
  2 * Math.PI * Math.sqrt(Math.pow(distance, 3) / sunMass);


// 
