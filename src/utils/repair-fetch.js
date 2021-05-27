export const fetchRepairs = async (codigo, dir, status) => {
  const response = await fetch(
    `https://extranet-backend.herokuapp.com/repairs?codigo=${codigo}&dir=${dir}&status=${status}`,
    { method: 'GET', headers: { 'Content-Type': 'application/json' } }
  );
  return await response.json();
};
