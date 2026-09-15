// ============= Google Form checkout configuration =============
// Paste your Google Form link below (the /viewform URL) and the checkout
// automatically sends customers there with their details pre-filled.

export const ORDER_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeqRI0p77TeNlNx1f3ylKE7huKMcOpnmwCTbz5Nm6ds-W5Lbw/viewform";

// Field ids read from the live form. Leave any blank and that field simply
// won't be pre-filled. The form has a single Address box, so city, state and
// pincode are folded into it.
export const FORM_ENTRIES = {
  name: "entry.2005620554",
  email: "entry.1045781291",
  phone: "entry.1166974658",
  address: "entry.1065046570",
  city: "",
  state: "",
  pincode: "",
  payment: "",
  // A long-answer field that receives the full list of items ordered.
  orderDetails: "entry.839337160",
} as const;


export function orderFormConfigured() {
  return ORDER_FORM_URL.trim().length > 0;
}

type OrderValues = {
  name?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  address?: string | undefined;
  city?: string | undefined;
  state?: string | undefined;
  pincode?: string | undefined;
  payment?: string | undefined;
  orderDetails?: string | undefined;
};

export function buildOrderFormUrl(values: OrderValues): string | null {
  if (!orderFormConfigured()) return null;
  const params = new URLSearchParams();
  params.set("usp", "pp_url");
  for (const [field, entry] of Object.entries(FORM_ENTRIES)) {
    if (!entry) continue;
    const value = values[field as keyof OrderValues];
    if (value) params.set(entry, value);
  }
  return `${ORDER_FORM_URL}?${params.toString()}`;
}
