"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Plus } from "lucide-react";
import {
  CASTES,
  CITIES,
  DIETS,
  EDUCATIONS,
  HEIGHTS,
  MANGAL_DOSH,
  MARITAL_STATUSES,
  MOTHER_TONGUES,
  OCCUPATIONS,
  RELIGIONS,
  SALARIES,
  STATES,
} from "@/lib/constants";
import { useProfile } from "@/lib/store";
import {
  AgeRange,
  PrimaryButton,
  SearchField,
  SelectionChip,
  TextInput,
} from "@/components/ui";

const TITLES: Record<string, string> = {
  basic: "Basic details",
  photos: "Photos",
  occupation: "Occupation",
  family: "Family",
  astrology: "Astrology",
  health: "Health",
  preferences: "Preferences",
};

const FATHER_STATUSES = ["Employed", "Retired", "Business", "Expired", "Not Applicable"];
const MOTHER_STATUSES = ["Homemaker", "Employed", "Retired", "Business", "Expired", "Not Applicable"];
const FAMILY_TYPES = ["Nuclear", "Joint"];
const FAMILY_SALARIES = [
  "Don't want to tell",
  "Less than ₹50,000",
  "₹50,000 – ₹1 Lakh",
  "₹1 Lakh – ₹1.5 Lakh",
  "₹1.5 Lakh – ₹2 Lakh",
  "₹2 Lakh – ₹5 Lakh",
  "More than ₹5 Lakh",
];
const PROPERTY_OPTIONS = [
  "Own House",
  "Agricultural Land",
  "2 Wheeler",
  "4 Wheeler",
  "Shop / Commercial",
];
const YES_NO = ["Yes", "No"];
const HEALTH_ISSUES = ["No Problem", "Yes", "Prefer not to say"];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] font-semibold text-[var(--ss-muted)] mb-1.5 mt-4 first:mt-0">{children}</p>;
}

function toggleInList(list: string[], value: string) {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}

export default function EditSectionPage() {
  const { section } = useParams<{ section: string }>();
  const { profile, patch, patchPrefs } = useProfile();
  const router = useRouter();
  const title = TITLES[section] || "Edit";
  const [cityQuery, setCityQuery] = useState("");
  const [casteQuery, setCasteQuery] = useState("");
  const [stateQuery, setStateQuery] = useState("");

  const photos = profile.profilePhotos?.length
    ? profile.profilePhotos
    : [profile.profilePhoto, null, null, null, null, null];

  function setSlot(index: number, value: string | null) {
    const next = [...photos];
    while (next.length < 6) next.push(null);
    next[index] = value;
    patch({
      profilePhotos: next.slice(0, 6),
      profilePhoto: next.find(Boolean) || null,
    });
  }

  const cityList = useMemo(() => {
    const q = cityQuery.trim().toLowerCase();
    return (q ? CITIES.filter((c) => c.toLowerCase().includes(q)) : CITIES).slice(0, 6);
  }, [cityQuery]);

  const casteList = useMemo(() => {
    const q = casteQuery.trim().toLowerCase();
    return (
      q
        ? CASTES.filter(
            (c) => c.name.toLowerCase().includes(q) || c.aliases.toLowerCase().includes(q)
          )
        : CASTES
    ).slice(0, 8);
  }, [casteQuery]);

  const stateList = useMemo(() => {
    const q = stateQuery.trim().toLowerCase();
    return (q ? STATES.filter((s) => s.toLowerCase().includes(q)) : STATES).slice(0, 12);
  }, [stateQuery]);

  const p = profile.matchPreferences;
  const selectedStates = p.states || [];
  const selectedTongues = p.motherTongues?.length
    ? p.motherTongues
    : p.motherTongue
      ? [p.motherTongue]
      : [];
  const selectedEducations = p.educations?.length
    ? p.educations
    : p.education
      ? [p.education]
      : [];
  const selectedProperty = (profile.familyProperty || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!TITLES[section]) {
    return (
      <div className="p-6 text-sm text-[var(--ss-muted)]">
        Section not found.{" "}
        <button type="button" className="underline" onClick={() => router.push("/me/edit")}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[var(--ss-bg)]">
      <header className="safe-top px-4 pt-3 pb-3 shrink-0 flex items-center gap-2 border-b border-[var(--ss-line)] bg-[var(--ss-bg)]">
        <button
          type="button"
          onClick={() => router.push("/me/edit")}
          className="h-9 w-9 flex items-center justify-center -ml-1"
          aria-label="Back"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-[18px] font-bold">Update {title}</h1>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pt-3 pb-4">
        {section === "basic" ? (
          <>
            <FieldLabel>Name</FieldLabel>
            <TextInput value={profile.name} onChange={(v) => patch({ name: v })} placeholder="Full name" />
            <FieldLabel>Gender</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {["Male", "Female"].map((g) => (
                <SelectionChip key={g} selected={profile.gender === g} onClick={() => patch({ gender: g })}>
                  {g}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Religion</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {RELIGIONS.map((v) => (
                <SelectionChip key={v} selected={profile.religion === v} onClick={() => patch({ religion: v })}>
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Community</FieldLabel>
            <SearchField value={casteQuery} onChange={setCasteQuery} placeholder="Search community" />
            <div className="flex flex-wrap gap-2 mt-2">
              {casteList.map((c) => (
                <SelectionChip
                  key={c.name}
                  selected={profile.caste === c.name}
                  onClick={() => {
                    patch({ caste: c.name });
                    setCasteQuery("");
                  }}
                >
                  {c.name}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Mother tongue</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {MOTHER_TONGUES.map((v) => (
                <SelectionChip
                  key={v}
                  selected={profile.motherTongue === v}
                  onClick={() => patch({ motherTongue: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>City</FieldLabel>
            <SearchField
              value={cityQuery || profile.city}
              onChange={(v) => {
                setCityQuery(v);
                patch({ city: v });
              }}
              placeholder="Search city"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {cityList.map((c) => (
                <SelectionChip
                  key={c}
                  selected={profile.city === c}
                  onClick={() => {
                    patch({ city: c });
                    setCityQuery("");
                  }}
                >
                  {c.split(",")[0]}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Height</FieldLabel>
            <select
              value={profile.height}
              onChange={(e) => patch({ height: e.target.value })}
              className="w-full h-[52px] rounded-[16px] border border-[var(--ss-line)] bg-[var(--ss-surface)] px-4"
            >
              {HEIGHTS.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
            <FieldLabel>Diet</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {DIETS.map((v) => (
                <SelectionChip key={v} selected={profile.diet === v} onClick={() => patch({ diet: v })}>
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Marital status</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {MARITAL_STATUSES.map((v) => (
                <SelectionChip
                  key={v}
                  selected={profile.maritalStatus === v}
                  onClick={() => patch({ maritalStatus: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>About</FieldLabel>
            <textarea
              value={profile.about}
              onChange={(e) => patch({ about: e.target.value })}
              rows={5}
              placeholder="Tell about yourself"
              className="w-full rounded-[16px] border border-[var(--ss-line)] bg-[var(--ss-surface)] p-4 text-[15px]"
            />
          </>
        ) : null}

        {section === "photos" ? (
          <>
            <p className="text-[12px] text-[var(--ss-muted)] mb-3">Add up to 6 photos</p>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <label
                  key={i}
                  className="relative aspect-square rounded-[14px] border border-dashed border-[var(--ss-line)] bg-[var(--ss-surface)] overflow-hidden cursor-pointer flex items-center justify-center"
                >
                  {photos[i] ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photos[i] || ""} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      <button
                        type="button"
                        className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/50 text-white text-[12px]"
                        onClick={(e) => {
                          e.preventDefault();
                          setSlot(i, null);
                        }}
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <span className="flex flex-col items-center text-[var(--ss-muted)]">
                      <Plus size={20} />
                      <span className="text-[10px] mt-1">{i + 1}</span>
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => setSlot(i, String(reader.result));
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
              ))}
            </div>
          </>
        ) : null}

        {section === "occupation" ? (
          <>
            <FieldLabel>Occupation</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {OCCUPATIONS.map((v) => (
                <SelectionChip
                  key={v}
                  selected={profile.occupation === v}
                  onClick={() => patch({ occupation: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Education level</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {EDUCATIONS.map((v) => (
                <SelectionChip
                  key={v}
                  selected={profile.education === v}
                  onClick={() => patch({ education: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Monthly salary</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {SALARIES.map((v) => (
                <SelectionChip
                  key={v}
                  selected={profile.monthlySalary === v}
                  onClick={() => patch({ monthlySalary: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Company location</FieldLabel>
            <TextInput
              value={profile.companyLocation}
              onChange={(v) => patch({ companyLocation: v })}
              placeholder="e.g. Gurugram, Haryana"
            />
            <FieldLabel>Company name</FieldLabel>
            <TextInput
              value={profile.companyName}
              onChange={(v) => patch({ companyName: v })}
              placeholder="Company name"
            />
          </>
        ) : null}

        {section === "family" ? (
          <>
            <FieldLabel>Father&apos;s status</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {FATHER_STATUSES.map((v) => (
                <SelectionChip
                  key={v}
                  selected={profile.fatherStatus === v}
                  onClick={() => patch({ fatherStatus: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Mother&apos;s status</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {MOTHER_STATUSES.map((v) => (
                <SelectionChip
                  key={v}
                  selected={profile.motherStatus === v}
                  onClick={() => patch({ motherStatus: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Family place</FieldLabel>
            <TextInput
              value={profile.familyPlace}
              onChange={(v) => patch({ familyPlace: v })}
              placeholder="e.g. Rewari, Haryana"
            />
            <FieldLabel>Family monthly salary</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {FAMILY_SALARIES.map((v) => (
                <SelectionChip
                  key={v}
                  selected={profile.familyMonthlySalary === v}
                  onClick={() => patch({ familyMonthlySalary: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Family property</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_OPTIONS.map((v) => (
                <SelectionChip
                  key={v}
                  selected={selectedProperty.includes(v)}
                  onClick={() =>
                    patch({ familyProperty: toggleInList(selectedProperty, v).join(", ") })
                  }
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Family type</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {FAMILY_TYPES.map((v) => (
                <SelectionChip
                  key={v}
                  selected={profile.familyType === v}
                  onClick={() => patch({ familyType: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Siblings</FieldLabel>
            <TextInput
              value={profile.siblings}
              onChange={(v) => patch({ siblings: v })}
              placeholder="e.g. 1 Sister"
            />
          </>
        ) : null}

        {section === "astrology" ? (
          <>
            <FieldLabel>Mangal Dosh</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {MANGAL_DOSH.map((m) => (
                <SelectionChip
                  key={m.id}
                  selected={profile.mangalDosh === m.label}
                  onClick={() => patch({ mangalDosh: m.label })}
                >
                  {m.label}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Date of Birth</FieldLabel>
            <input
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => patch({ dateOfBirth: e.target.value })}
              className="w-full h-[52px] rounded-[16px] border border-[var(--ss-line)] bg-[var(--ss-surface)] px-4"
            />
            <FieldLabel>Birth time</FieldLabel>
            <TextInput
              value={profile.birthTime}
              onChange={(v) => patch({ birthTime: v })}
              placeholder="e.g. 10:30 AM"
            />
            <FieldLabel>Place of birth</FieldLabel>
            <TextInput
              value={profile.placeOfBirth}
              onChange={(v) => patch({ placeOfBirth: v })}
              placeholder="e.g. Rewari, Haryana"
            />
          </>
        ) : null}

        {section === "health" ? (
          <>
            <FieldLabel>Drinks alcohol?</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {YES_NO.map((v) => (
                <SelectionChip
                  key={v}
                  selected={profile.drinksAlcohol === v}
                  onClick={() => patch({ drinksAlcohol: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Smokes cigarettes?</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {YES_NO.map((v) => (
                <SelectionChip
                  key={v}
                  selected={profile.smokes === v}
                  onClick={() => patch({ smokes: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Have any health issue?</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {HEALTH_ISSUES.map((v) => (
                <SelectionChip
                  key={v}
                  selected={profile.healthIssue === v}
                  onClick={() => patch({ healthIssue: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Have any type of disability?</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {YES_NO.map((v) => (
                <SelectionChip
                  key={v}
                  selected={profile.disability === v}
                  onClick={() => patch({ disability: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
          </>
        ) : null}

        {section === "preferences" ? (
          <>
            <FieldLabel>Age limit</FieldLabel>
            <div className="rounded-[16px] border border-[var(--ss-line)] bg-[var(--ss-surface)] px-4 py-3">
              <AgeRange
                min={18}
                max={50}
                low={p.ageMin}
                high={p.ageMax}
                onChange={(low, high) => patchPrefs({ ageMin: low, ageMax: high })}
              />
            </div>
            <FieldLabel>Location (states)</FieldLabel>
            <p className="text-[11px] text-[var(--ss-muted)] -mt-1 mb-2">Select one or more</p>
            <SearchField value={stateQuery} onChange={setStateQuery} placeholder="Search state" />
            <div className="flex flex-wrap gap-2 mt-2">
              {stateList.map((s) => (
                <SelectionChip
                  key={s}
                  selected={selectedStates.includes(s)}
                  onClick={() => patchPrefs({ states: toggleInList(selectedStates, s) })}
                >
                  {s}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Height</FieldLabel>
            <div className="flex flex-wrap gap-2 mb-2">
              <SelectionChip
                selected={p.heightAllOk}
                onClick={() => patchPrefs({ heightAllOk: true })}
              >
                All Ok
              </SelectionChip>
              <SelectionChip
                selected={!p.heightAllOk}
                onClick={() => patchPrefs({ heightAllOk: false })}
              >
                Set range
              </SelectionChip>
            </div>
            {!p.heightAllOk ? (
              <div className="flex gap-3">
                <select
                  value={p.heightMin}
                  onChange={(e) => patchPrefs({ heightMin: e.target.value, heightAllOk: false })}
                  className="flex-1 h-11 rounded-[12px] border border-[var(--ss-line)] bg-[var(--ss-surface)] px-2"
                >
                  {HEIGHTS.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </select>
                <select
                  value={p.heightMax}
                  onChange={(e) => patchPrefs({ heightMax: e.target.value, heightAllOk: false })}
                  className="flex-1 h-11 rounded-[12px] border border-[var(--ss-line)] bg-[var(--ss-surface)] px-2"
                >
                  {HEIGHTS.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </select>
              </div>
            ) : null}
            <FieldLabel>Diet</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {["All Ok", ...DIETS].map((v) => (
                <SelectionChip
                  key={v}
                  selected={(p.diet || "All Ok") === v}
                  onClick={() => patchPrefs({ diet: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Marital status</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {["All Ok", ...MARITAL_STATUSES].map((v) => (
                <SelectionChip
                  key={v}
                  selected={(p.maritalStatus || "All Ok") === v}
                  onClick={() => patchPrefs({ maritalStatus: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Mother tongue</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {["All Ok", ...MOTHER_TONGUES].map((v) => (
                <SelectionChip
                  key={v}
                  selected={
                    v === "All Ok"
                      ? !selectedTongues.length || p.motherTongue === "All Ok"
                      : selectedTongues.includes(v)
                  }
                  onClick={() =>
                    patchPrefs(
                      v === "All Ok"
                        ? { motherTongues: [], motherTongue: "All Ok" }
                        : {
                            motherTongues: toggleInList(
                              selectedTongues.filter((x) => x !== "All Ok"),
                              v
                            ),
                            motherTongue: v,
                          }
                    )
                  }
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Mangal Dosh</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {["All Ok", "No", "Yes", "Anshik", "Don't know"].map((v) => (
                <SelectionChip
                  key={v}
                  selected={(p.mangalDosh || "All Ok") === v}
                  onClick={() => patchPrefs({ mangalDosh: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Occupation</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {["All Ok", ...OCCUPATIONS].map((v) => (
                <SelectionChip
                  key={v}
                  selected={(p.occupation || "All Ok") === v}
                  onClick={() => patchPrefs({ occupation: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Monthly salary</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {["All Ok", ...SALARIES].map((v) => (
                <SelectionChip
                  key={v}
                  selected={(p.monthlySalary || "All Ok") === v}
                  onClick={() => patchPrefs({ monthlySalary: v })}
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
            <FieldLabel>Education level</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {["All Ok", ...EDUCATIONS].map((v) => (
                <SelectionChip
                  key={v}
                  selected={
                    v === "All Ok"
                      ? !selectedEducations.length || p.education === "All Ok"
                      : selectedEducations.includes(v)
                  }
                  onClick={() =>
                    patchPrefs(
                      v === "All Ok"
                        ? { educations: [], education: "All Ok" }
                        : {
                            educations: toggleInList(
                              selectedEducations.filter((x) => x !== "All Ok"),
                              v
                            ),
                            education: v,
                          }
                    )
                  }
                >
                  {v}
                </SelectionChip>
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="px-4 pt-2 safe-bottom bg-[var(--ss-bg)] border-t border-[var(--ss-line)] shrink-0">
        <PrimaryButton onClick={() => router.push("/me/edit")}>Save</PrimaryButton>
      </div>
    </div>
  );
}
