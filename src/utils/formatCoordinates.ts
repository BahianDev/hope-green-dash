export const formatCoordinates = (coord: string | undefined) => {
  if (!coord) throw new Error("Coordenada inválida");

  // Remove °, espaços e transforma em número
  let numericValue = parseFloat(coord.replace(/[^\d.-]/g, ""));

  // Ajusta o sinal para Sul (S) ou Oeste (O)
  if (coord.includes("S") || coord.includes("O")) {
    numericValue = -Math.abs(numericValue); // Garante que será negativo
  }

  return String(numericValue);
};
