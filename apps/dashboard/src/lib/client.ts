export const fetchPurchases = async (url: string, page: number) => {
    try {
      const res = await fetch(`${process.env.CLOUDRUN_DEV_URL}/purchases/all-purchases?limit=370&page=${page}`, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const response = await res.json();
      const customData = response.purchases.map((obj: ZPurchase) => ({
        id: obj.id,
        orderNumber: obj.order_number,
        email: obj.email,
        customerName: obj.first_name + ' ' + obj.last_name,
        date: obj.created_at,
        updatedDate: obj.updated_at,
        confirmationCode: obj.code,
        numberOfVrGlasses: obj.number_of_vr_glasses,
        numberOfLicenses: obj.number_of_licenses,
        isSubscription: obj.is_subscription,
        duration: obj.duration,
      }));
      const data = {
        purchases: customData.reverse(),
        currentPage: response.currentPage,
        total: response.total,
        totalPages: response.totalPages
      }
      console.log(data)
      return data
    } catch (err: any) {
      console.error(err.message);
    } 
  };