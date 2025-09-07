export type Profile = {
  name: string
  email: string
  phone?: string
}

export type Address = {
  fullName: string
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string // ISO code, default 'IN'
  phone?: string
}

export const defaultProfile: Profile = {
  name: "",
  email: "",
  phone: "",
}

export const defaultAddress: Address = {
  fullName: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "IN",
  phone: "",
}

export function requiredFilled(addr: Address) {
  return !!(addr.fullName && addr.line1 && addr.city && addr.state && addr.postalCode && addr.country)
}
