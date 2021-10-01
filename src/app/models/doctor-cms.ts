export class DoctorCMS {
  doc_id: string;
  doctor_id: string;
  type: string;
  channels: string[];
  treatmentCategories: TreatmentCategory[];
  testimonials: Testimonial[];
  primaryColor: string;
  textColor: string;
  navBarColor: string;
  navBarTextColor: string;
  landingPageImages: string[];
  gallery: string[];

  receptionNumber: string;
  clinicNumber: string;
  doctorNumber: string;
  whatsappLink: string;
  logoUrl: string;
  speciality: string;
  education: string;
  yearsOfExperience: number;

  overviewAlias: string;
  doctorImageUrl: string;
}
export interface TreatmentCategory {
  id: string;
  categoryName: string;
  subCategories: string[];
}
export interface Testimonial {
  id: string;
  description: string;
  name: string;
  displayOnPortal: boolean;
}
