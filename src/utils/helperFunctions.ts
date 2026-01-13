

export function capitalizeFirstLetter(str: string): string {
  if (!str || str.length < 3) return str; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const formatAmount = (amount: number | undefined) => {
  if (!amount) {
    return 0;
  }
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // You can change the currency code as needed
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return formattedAmount;
};

export const formatNumber = (value: number | string) => {
  const rawValue = value?.toString().replace(/\D/g, ""); // Remove non-numeric characters
  return new Intl.NumberFormat().format(Number(rawValue)) || "";
};