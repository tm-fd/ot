

export default function getPurchases() {
 
  const purchasesResult = await fetch(process.env.GET_PURCHASES_URL, {
    cache: 'no-store',
  });
 
  const purchasesData = await purchasesResult.json();
}
