type freelancer_user = {
  user_email: string;
  user_country: string;
};

type freelancer_bio = {
  bio_title: string;
  bio_description: string;
};

type freelancer_experience = {
  experience: string;
  bio_description: string;
};

export type freelancer_education = {
  id: number;
  education_school: string;
  education_year_from: string;
  education_year_to: string;
};

export interface ProfileInterface {
  freelancer_user: freelancer_user;
  freelancer_Bio: freelancer_bio;
  freelancer_experience: any;
  freelancer_availability: boolean;
}
