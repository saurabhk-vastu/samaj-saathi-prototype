"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ProfileState } from "./types";

const STORAGE_KEY = "samaj-saathi-profile-v1";

export const defaultState: ProfileState = {
  language: "",
  mobile: "",
  profileFor: "",
  gender: "",
  religion: "",
  caste: "",
  openToOtherCaste: "",
  motherTongue: "",
  name: "",
  dateOfBirth: "",
  city: "",
  height: "5'6\"",
  diet: "",
  maritalStatus: "",
  mangalDosh: "",
  birthTime: "",
  placeOfBirth: "",
  occupation: "",
  monthlySalary: "",
  companyLocation: "",
  companyName: "",
  education: "",
  whatsappOptIn: null,
  profilePhoto: null,
  profilePhotos: [null, null, null, null, null, null],
  about: "",
  fatherStatus: "",
  motherStatus: "",
  familyPlace: "",
  familyMonthlySalary: "",
  familyProperty: "",
  familyType: "",
  siblings: "",
  drinksAlcohol: "No",
  smokes: "No",
  healthIssue: "No Problem",
  disability: "No",
  isPremium: false,
  hasRecharged: false,
  idVerified: false,
  locationPrivacy: "all-india",
  matchPreferences: {
    ageMin: 24,
    ageMax: 32,
    openToOtherCaste: "",
    city: "",
    states: [],
    maritalStatus: "Unmarried",
    motherTongue: "",
    motherTongues: [],
    monthlySalary: "All Ok",
    occupation: "All Ok",
    education: "",
    educations: [],
    heightMin: "5'4\"",
    heightMax: "6'0\"",
    heightAllOk: true,
    diet: "Vegetarian",
    mangalDosh: "All Ok",
  },
  likedIds: [],
  shortlistedIds: [],
  contactedIds: [],
};

type Ctx = {
  profile: ProfileState;
  ready: boolean;
  patch: (partial: Partial<ProfileState>) => void;
  patchPrefs: (partial: Partial<ProfileState["matchPreferences"]>) => void;
  toggleShortlist: (id: string) => void;
  toggleLike: (id: string) => void;
  markContacted: (id: string) => void;
  reset: () => void;
};

const ProfileContext = createContext<Ctx | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileState>(defaultState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ProfileState;
        setProfile({
          ...defaultState,
          ...parsed,
          profilePhotos: parsed.profilePhotos?.length
            ? [...parsed.profilePhotos, null, null, null, null, null, null].slice(0, 6)
            : parsed.profilePhoto
              ? [parsed.profilePhoto, null, null, null, null, null]
              : defaultState.profilePhotos,
          matchPreferences: {
            ...defaultState.matchPreferences,
            ...parsed.matchPreferences,
            states: Array.isArray(parsed.matchPreferences?.states)
              ? parsed.matchPreferences.states
              : parsed.matchPreferences?.city
                ? [
                    parsed.matchPreferences.city.includes(",")
                      ? parsed.matchPreferences.city.split(",")[1].trim()
                      : parsed.matchPreferences.city,
                  ].filter(Boolean)
                : defaultState.matchPreferences.states,
            motherTongues: Array.isArray(parsed.matchPreferences?.motherTongues)
              ? parsed.matchPreferences.motherTongues
              : parsed.matchPreferences?.motherTongue
                ? [parsed.matchPreferences.motherTongue]
                : defaultState.matchPreferences.motherTongues,
            educations: Array.isArray(parsed.matchPreferences?.educations)
              ? parsed.matchPreferences.educations
              : parsed.matchPreferences?.education
                ? [parsed.matchPreferences.education]
                : defaultState.matchPreferences.educations,
            heightAllOk:
              typeof parsed.matchPreferences?.heightAllOk === "boolean"
                ? parsed.matchPreferences.heightAllOk
                : defaultState.matchPreferences.heightAllOk,
          },
          contactedIds: parsed.contactedIds || [],
          hasRecharged: Boolean(parsed.hasRecharged),
          locationPrivacy: parsed.locationPrivacy === "nearby" ? "nearby" : "all-india",
        });
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile, ready]);

  const patch = useCallback((partial: Partial<ProfileState>) => {
    setProfile((p) => ({ ...p, ...partial }));
  }, []);

  const patchPrefs = useCallback((partial: Partial<ProfileState["matchPreferences"]>) => {
    setProfile((p) => ({
      ...p,
      matchPreferences: { ...p.matchPreferences, ...partial },
    }));
  }, []);

  const toggleShortlist = useCallback((id: string) => {
    setProfile((p) => ({
      ...p,
      shortlistedIds: p.shortlistedIds.includes(id)
        ? p.shortlistedIds.filter((x) => x !== id)
        : [...p.shortlistedIds, id],
    }));
  }, []);

  const toggleLike = useCallback((id: string) => {
    setProfile((p) => ({
      ...p,
      likedIds: p.likedIds.includes(id)
        ? p.likedIds.filter((x) => x !== id)
        : [...p.likedIds, id],
    }));
  }, []);

  const markContacted = useCallback((id: string) => {
    setProfile((p) =>
      p.contactedIds.includes(id) ? p : { ...p, contactedIds: [...p.contactedIds, id] }
    );
  }, []);

  const reset = useCallback(() => {
    setProfile(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      profile,
      ready,
      patch,
      patchPrefs,
      toggleShortlist,
      toggleLike,
      markContacted,
      reset,
    }),
    [profile, ready, patch, patchPrefs, toggleShortlist, toggleLike, markContacted, reset]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
