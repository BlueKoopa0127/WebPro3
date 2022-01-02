export async function getValue(key) {
    const response = await fetch(
      `https://api.countapi.xyz/hit/BlueKoopa0127/${key}`
    );
    const data = await response.json();
    return data.value;
  }