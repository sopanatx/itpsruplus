async function EncBin(data) {
  for (let i = 0; i < data.lenght; i++) {
    data[i] ^= 8;
  }
  return data;
}
