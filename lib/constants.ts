export const LANGUAGES = [
  { code: "hi", label: "हिन्दी", sub: "Hindi" },
  { code: "en", label: "English", sub: "English" },
  { code: "mr", label: "मराठी", sub: "Marathi" },
  { code: "gu", label: "ગુજરાતી", sub: "Gujarati" },
  { code: "bn", label: "বাংলা", sub: "Bengali" },
  { code: "kn", label: "ಕನ್ನಡ", sub: "Kannada" },
  { code: "ta", label: "தமிழ்", sub: "Tamil" },
  { code: "ml", label: "മലയാളം", sub: "Malayalam" },
];

export const PROFILE_FOR = [
  { id: "myself", label: "Myself" },
  { id: "son", label: "Son" },
  { id: "daughter", label: "Daughter" },
  { id: "brother", label: "Brother" },
  { id: "sister", label: "Sister" },
  { id: "friend", label: "Friend" },
  { id: "relative", label: "Relative" },
];

export const RELIGIONS = [
  "Hindu",
  "Muslim",
  "Christian",
  "Sikh",
  "Jain",
  "Parsi",
  "Buddhist",
];

/** Communities grouped so close names are not split (Ahir / Yadav). */
export const CASTES = [
  { name: "Agarwal", aliases: "" },
  { name: "Arora", aliases: "" },
  { name: "Baniya", aliases: "" },
  { name: "Brahmin", aliases: "Gaur, Iyer, Iyengar, Saraswat" },
  { name: "Gupta", aliases: "" },
  { name: "Jat", aliases: "" },
  { name: "Kayastha", aliases: "" },
  { name: "Khatri", aliases: "" },
  { name: "Kshatriya / Rajput", aliases: "Rajput" },
  { name: "Kurmi", aliases: "" },
  { name: "Lingayat", aliases: "" },
  { name: "Maratha", aliases: "" },
  { name: "Nair", aliases: "" },
  { name: "Patel", aliases: "Patidar" },
  { name: "Reddy", aliases: "" },
  { name: "Scheduled Caste", aliases: "" },
  { name: "Scheduled Tribe", aliases: "" },
  { name: "Sindhi", aliases: "" },
  { name: "Sunni", aliases: "" },
  { name: "Syed", aliases: "" },
  { name: "Vishwakarma", aliases: "" },
  { name: "Yadav", aliases: "Ahir, Yadava — shown as one community" },
  { name: "Other / Prefer to specify later", aliases: "" },
];

export const MOTHER_TONGUES = [
  "Hindi",
  "Marathi",
  "Gujarati",
  "Bengali",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Odia",
  "Assamese",
  "Urdu",
  "English",
  "Rajasthani",
  "Bhojpuri",
  "Maithili",
];

export const CITIES = [
  "Gurugram, Haryana",
  "New Delhi, Delhi",
  "Noida, Uttar Pradesh",
  "Faridabad, Haryana",
  "Mumbai, Maharashtra",
  "Pune, Maharashtra",
  "Nagpur, Maharashtra",
  "Nashik, Maharashtra",
  "Ahmedabad, Gujarat",
  "Surat, Gujarat",
  "Vadodara, Gujarat",
  "Jaipur, Rajasthan",
  "Udaipur, Rajasthan",
  "Jodhpur, Rajasthan",
  "Bengaluru, Karnataka",
  "Mysuru, Karnataka",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
  "Coimbatore, Tamil Nadu",
  "Kochi, Kerala",
  "Thiruvananthapuram, Kerala",
  "Kolkata, West Bengal",
  "Bhubaneswar, Odisha",
  "Lucknow, Uttar Pradesh",
  "Kanpur, Uttar Pradesh",
  "Varanasi, Uttar Pradesh",
  "Indore, Madhya Pradesh",
  "Bhopal, Madhya Pradesh",
  "Chandigarh, Chandigarh",
  "Patna, Bihar",
  "Ranchi, Jharkhand",
  "Guwahati, Assam",
  "Visakhapatnam, Andhra Pradesh",
  "Vijayawada, Andhra Pradesh",
];

export const STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const HEIGHTS = [
  "4'10\"",
  "4'11\"",
  "5'0\"",
  "5'1\"",
  "5'2\"",
  "5'3\"",
  "5'4\"",
  "5'5\"",
  "5'6\"",
  "5'7\"",
  "5'8\"",
  "5'9\"",
  "5'10\"",
  "5'11\"",
  "6'0\"",
  "6'1\"",
  "6'2\"",
  "6'3\"",
  "6'4\"",
];

export const DIETS = ["Vegetarian", "Eggetarian", "Non-Vegetarian"];

export const MARITAL_STATUSES = [
  "Unmarried",
  "Widow",
  "Divorced / Getting Divorced",
];

export const MANGAL_DOSH = [
  { id: "no", label: "No", hint: "No Mangal Dosh" },
  { id: "yes", label: "Yes", hint: "Manglik" },
  { id: "anshik", label: "Anshik", hint: "Partial Mangal Dosh" },
  { id: "dont-know", label: "Don't know", hint: "Will share later" },
];

export const OCCUPATIONS = [
  "Not Applicable",
  "Private Company",
  "Government Job",
  "Defence Job",
  "Business",
  "Student",
];

export const SALARIES = [
  "Don't want to tell",
  "Less than ₹10,000",
  "₹10,000 – ₹20,000",
  "₹20,000 – ₹30,000",
  "₹30,000 – ₹50,000",
  "₹50,000 – ₹1 Lakh",
  "₹1 Lakh – ₹2 Lakh",
  "₹2 Lakh – ₹5 Lakh",
  "More than ₹5 Lakh",
];

export const EDUCATIONS = [
  "10th",
  "12th",
  "Diploma",
  "Graduate",
  "Post Graduate",
  "Doctorate",
  "Professional degree",
];

export const ONBOARDING_STEPS = [
  "profile-for",
  "gender",
  "religion",
  "caste",
  "other-caste",
  "mother-tongue",
  "name",
  "dob",
  "city",
  "height",
  "diet",
  "marital",
  "mangal",
  "occupation",
  "salary",
  "company",
  "education",
  "whatsapp",
  "photo",
  "prefs-1",
  "about",
  "premium",
] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];
