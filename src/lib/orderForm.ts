// ============= Google Form checkout configuration =============
// Paste your Google Form link below (the /viewform URL) and the checkout
// automatically sends customers there with their details pre-filled.

export const ORDER_FORM_URL = "";

// Once the form exists, open it, view its HTML (or use "Get pre-filled link"
// in Google Forms) and copy each field's entry id, e.g. "entry.123456789".
// Leave any blank and that field simply won't be pre-filled.
export const FORM_ENTRIES = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  payment: "",
  // A long-answer field that receives the full list of items ordered.
  orderDetails: "",
} as const;

export function orderFormConfigured() {
  return ORDER_FORM_URL.trim().length > 0;
}

type OrderValues = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  payment?: string;
  orderDetails?: string;
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
