export interface PartnerInner {
  partnerColorCode: string;
  partnerId: number;
  partnerLogoUrl: string;
  partnerName: string;
}
export interface Partner {
  labPartner: Array<PartnerInner>;
  pharmacyPartner: Array<PartnerInner>;
}
