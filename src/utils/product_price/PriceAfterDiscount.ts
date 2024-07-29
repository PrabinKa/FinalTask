export const priceAfterDiscount = (
  discount: number,
  originalPrice: number,
): number => {
  const discountPrice = (discount / 100) * originalPrice;
  const finalPrice = Number(originalPrice) - Number(discountPrice);

  return finalPrice;
};
