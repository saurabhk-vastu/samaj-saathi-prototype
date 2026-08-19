"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
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
  ONBOARDING_STEPS,
  PROFILE_FOR,
  RELIGIONS,
  SALARIES,
  type OnboardingStep,
} from "@/lib/constants";
import { useProfile } from "@/lib/store";
import {
  OnboardingLayout,
  OptionCard,
  IconTile,
  SalaryRow,
  PrimaryButton,
  PrivacyMessage,
  SearchField,
  SecondaryButton,
  SelectionChip,
  TextInput,
} from "@/components/ui";
import { MatchPreferencesForm } from "@/components/MatchPreferencesForm";
import {
  Plus,
  Baby,
  Briefcase,
  Building2,
  Church,
  CircleSlash,
  Egg,
  Flower2,
  GraduationCap,
  Heart,
  Leaf,
  Mars,
  MoonStar,
  Shield,
  Sparkles,
  Store,
  User,
  UserRound,
  Users,
  Venus,
  Wheat,
} from "lucide-react";

const TOTAL = ONBOARDING_STEPS.length;

function hrefFor(step: OnboardingStep) {
  return `/onboarding/${step}`;
}

function nextOf(step: OnboardingStep) {
  const i = ONBOARDING_STEPS.indexOf(step);
  return hrefFor(ONBOARDING_STEPS[i + 1]);
}

function prevOf(step: OnboardingStep) {
  const i = ONBOARDING_STEPS.indexOf(step);
  if (i <= 0) return "/language";
  return hrefFor(ONBOARDING_STEPS[i - 1]);
}

function stepNum(step: OnboardingStep) {
  return ONBOARDING_STEPS.indexOf(step) + 1;
}

function goNext(router: ReturnType<typeof useRouter>, step: OnboardingStep) {
  window.setTimeout(() => router.push(nextOf(step)), 150);
}

export function OnboardingFlow({ step }: { step: OnboardingStep }) {
  const n = stepNum(step);
  const back = prevOf(step);
  switch (step) {
    case "profile-for":
      return <ProfileFor step={n} back={back} />;
    case "gender":
      return <Gender step={n} back={back} />;
    case "religion":
      return <Religion step={n} back={back} />;
    case "caste":
      return <Caste step={n} back={back} />;
    case "other-caste":
      return <OtherCaste step={n} back={back} />;
    case "mother-tongue":
      return <MotherTongue step={n} back={back} />;
    case "name":
      return <Name step={n} back={back} />;
    case "dob":
      return <Dob step={n} back={back} />;
    case "city":
      return <City step={n} back={back} />;
    case "height":
      return <Height step={n} back={back} />;
    case "diet":
      return <Diet step={n} back={back} />;
    case "marital":
      return <Marital step={n} back={back} />;
    case "mangal":
      return <Mangal step={n} back={back} />;
    case "occupation":
      return <Occupation step={n} back={back} />;
    case "salary":
      return <Salary step={n} back={back} />;
    case "company":
      return <Company step={n} back={back} />;
    case "education":
      return <Education step={n} back={back} />;
    case "whatsapp":
      return <Whatsapp step={n} back={back} />;
    case "photo":
      return <Photo step={n} back={back} />;
    case "prefs-1":
      return <Prefs1 step={n} back={back} />;
    case "about":
      return <About step={n} back={back} />;
    case "premium":
      return <Premium step={n} back={back} />;
  }
}

function ProfileFor({ step, back }: { step: number; back: string }) {
  const { profile, patch } = useProfile();
  const router = useRouter();
  const icons: Record<string, ReactNode> = {
    myself: <User size={20} />,
    son: <Mars size={20} />,
    daughter: <Venus size={20} />,
    brother: <UserRound size={20} />,
    sister: <Heart size={20} />,
    friend: <Users size={20} />,
    relative: <Baby size={20} />,
  } as Record<string, ReactNode>;
  return (
    <OnboardingLayout title="Profile is for" step={step} total={TOTAL} backHref={back}>
      <div className="space-y-2">
        {PROFILE_FOR.map((o) => (
          <OptionCard
            key={o.id}
            title={o.label}
            icon={icons[o.id]}
            selected={profile.profileFor === o.id}
            onClick={() => {
              patch({ profileFor: o.id });
              goNext(router, "profile-for");
            }}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}

function Gender({ step, back }: { step: number; back: string }) {
  const { profile, patch } = useProfile();
  const router = useRouter();
  return (
    <OnboardingLayout title="I am" step={step} total={TOTAL} backHref={back}>
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            { g: "Male", icon: <Mars size={28} /> },
            { g: "Female", icon: <Venus size={28} /> },
          ] as const
        ).map(({ g, icon }) => (
          <button
            key={g}
            type="button"
            onClick={() => {
              patch({ gender: g });
              goNext(router, "gender");
            }}
            className={`h-[140px] rounded-[20px] border flex flex-col items-center justify-center gap-3 ${
              profile.gender === g
                ? "border-[var(--ss-primary)] bg-[var(--ss-primary-soft)]"
                : "border-[var(--ss-line)] bg-[var(--ss-surface)]"
            }`}
          >
            <span className="h-14 w-14 rounded-full bg-white text-[var(--ss-primary)] flex items-center justify-center">
              {icon}
            </span>
            <span className="text-[16px] font-semibold">{g}</span>
          </button>
        ))}
      </div>
    </OnboardingLayout>
  );
}

function Religion({ step, back }: { step: number; back: string }) {
  const { profile, patch } = useProfile();
  const router = useRouter();
  const icons: Record<string, ReactNode> = {
    Hindu: <Flower2 size={20} />,
    Muslim: <MoonStar size={20} />,
    Christian: <Church size={20} />,
    Sikh: <Sparkles size={20} />,
    Jain: <Wheat size={20} />,
    Parsi: <FlameIcon />,
    Buddhist: <Flower2 size={20} />,
  };
  return (
    <OnboardingLayout title="Religion" step={step} total={TOTAL} backHref={back}>
      <div className="space-y-2">
        {RELIGIONS.map((r) => (
          <OptionCard
            key={r}
            title={r}
            icon={icons[r]}
            selected={profile.religion === r}
            onClick={() => {
              patch({ religion: r });
              goNext(router, "religion");
            }}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}

function FlameIcon() {
  return <Sparkles size={20} />;
}

function Caste({ step, back }: { step: number; back: string }) {
  const { profile, patch } = useProfile();
  const router = useRouter();
  const [q, setQ] = useState("");
  const list = CASTES.filter(
    (c) =>
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.aliases.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <OnboardingLayout title="Caste" step={step} total={TOTAL} backHref={back}>
      <SearchField value={q} onChange={setQ} placeholder="Search" />
      <div className="space-y-2 mt-3">
        {list.map((c) => (
          <OptionCard
            key={c.name}
            title={c.name}
            selected={profile.caste === c.name}
            onClick={() => {
              patch({ caste: c.name });
              goNext(router, "caste");
            }}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}

function OtherCaste({ step, back }: { step: number; back: string }) {
  const { profile, patch, patchPrefs } = useProfile();
  const router = useRouter();
  return (
    <OnboardingLayout title="Want profiles from other castes?" step={step} total={TOTAL} backHref={back}>
      <div className="space-y-2">
        {["Yes", "No"].map((v) => (
          <OptionCard
            key={v}
            title={v}
            selected={profile.openToOtherCaste === v}
            onClick={() => {
              patch({ openToOtherCaste: v });
              patchPrefs({ openToOtherCaste: v });
              goNext(router, "other-caste");
            }}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}

function MotherTongue({ step, back }: { step: number; back: string }) {
  const { profile, patch, patchPrefs } = useProfile();
  const router = useRouter();
  const [q, setQ] = useState("");
  const list = MOTHER_TONGUES.filter((t) => t.toLowerCase().includes(q.toLowerCase()));
  return (
    <OnboardingLayout title="Mother tongue" step={step} total={TOTAL} backHref={back}>
      <SearchField value={q} onChange={setQ} placeholder="Search" />
      <div className="flex flex-wrap gap-2 mt-4">
        {list.map((t) => (
          <SelectionChip
            key={t}
            selected={profile.motherTongue === t}
            onClick={() => {
              patch({ motherTongue: t });
              patchPrefs({ motherTongue: t });
              goNext(router, "mother-tongue");
            }}
          >
            {t}
          </SelectionChip>
        ))}
      </div>
    </OnboardingLayout>
  );
}

function Name({ step, back }: { step: number; back: string }) {
  const { profile, patch } = useProfile();
  const router = useRouter();
  return (
    <OnboardingLayout
      title="Name"
      step={step}
      total={TOTAL}
      backHref={back}
      footer={
        <PrimaryButton
          disabled={profile.name.trim().length < 2}
          onClick={() => router.push(nextOf("name"))}
        >
          Continue
        </PrimaryButton>
      }
    >
      <TextInput value={profile.name} onChange={(v) => patch({ name: v })} placeholder="Full name" />
    </OnboardingLayout>
  );
}

function Dob({ step, back }: { step: number; back: string }) {
  const { profile, patch } = useProfile();
  const router = useRouter();
  const value = profile.dateOfBirth;
  const age = useMemo(() => {
    if (!value) return null;
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return null;
    const today = new Date();
    let a = today.getFullYear() - d.getFullYear();
    const m = today.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) a--;
    return a;
  }, [value]);
  const valid = age !== null && age >= 18 && age <= 70;
  return (
    <OnboardingLayout
      title="Date of birth"
      step={step}
      total={TOTAL}
      backHref={back}
      footer={
        <PrimaryButton disabled={!valid} onClick={() => router.push(nextOf("dob"))}>
          Continue
        </PrimaryButton>
      }
    >
      <input
        type="date"
        value={value}
        max="2008-12-31"
        min="1955-01-01"
        onChange={(e) => patch({ dateOfBirth: e.target.value })}
        className="w-full h-[52px] rounded-[16px] border border-[var(--ss-line)] bg-[var(--ss-surface)] px-4 text-[16px]"
      />
      {value && !valid ? (
        <p className="mt-3 text-[13px] text-[var(--ss-error)]">Please enter a valid date. Age should be 18 or above.</p>
      ) : age ? (
        <p className="mt-3 text-[13px] text-[var(--ss-muted)]">Age: {age} years</p>
      ) : null}
    </OnboardingLayout>
  );
}

function City({ step, back }: { step: number; back: string }) {
  const { profile, patch, patchPrefs } = useProfile();
  const router = useRouter();
  const [q, setQ] = useState("");
  const list = CITIES.filter((c) => c.toLowerCase().includes(q.toLowerCase()));
  return (
    <OnboardingLayout title="Your city" step={step} total={TOTAL} backHref={back}>
      <SearchField value={q} onChange={setQ} placeholder="Search city" />
      <div className="mt-3 space-y-2">
        {list.length === 0 ? (
          <p className="text-[13px] text-[var(--ss-muted)]">No cities match that search.</p>
        ) : (
          list.map((c) => (
            <OptionCard
              key={c}
              title={c}
              selected={profile.city === c}
              onClick={() => {
                patch({ city: c });
                patchPrefs({ city: c });
                goNext(router, "city");
              }}
            />
          ))
        )}
      </div>
    </OnboardingLayout>
  );
}

function Height({ step, back }: { step: number; back: string }) {
  const { profile, patch } = useProfile();
  const router = useRouter();
  return (
    <OnboardingLayout title="Height" step={step} total={TOTAL} backHref={back}>
      <div className="h-[360px] overflow-y-auto rounded-[18px] border border-[var(--ss-line)] bg-[var(--ss-surface)]">
        {HEIGHTS.map((h) => (
          <button
            key={h}
            type="button"
            onClick={() => {
              patch({ height: h });
              goNext(router, "height");
            }}
            className={`w-full h-12 text-[16px] border-b border-[var(--ss-line)] ${
              profile.height === h
                ? "bg-[var(--ss-primary-soft)] font-semibold text-[var(--ss-primary)]"
                : ""
            }`}
          >
            {h}
          </button>
        ))}
      </div>
    </OnboardingLayout>
  );
}

function Diet({ step, back }: { step: number; back: string }) {
  const { profile, patch, patchPrefs } = useProfile();
  const router = useRouter();
  const icons: Record<string, ReactNode> = {
    Vegetarian: <Leaf size={20} />,
    Eggetarian: <Egg size={20} />,
    "Non-Vegetarian": <Wheat size={20} />,
  };
  return (
    <OnboardingLayout title="Diet" step={step} total={TOTAL} backHref={back}>
      <div className="space-y-2">
        {DIETS.map((d) => (
          <OptionCard
            key={d}
            title={d}
            icon={icons[d]}
            selected={profile.diet === d}
            onClick={() => {
              patch({ diet: d });
              patchPrefs({ diet: d });
              goNext(router, "diet");
            }}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}

function Marital({ step, back }: { step: number; back: string }) {
  const { profile, patch, patchPrefs } = useProfile();
  const router = useRouter();
  const icons: Record<string, ReactNode> = {
    Unmarried: <Heart size={20} />,
    Widow: <User size={20} />,
    "Divorced / Getting Divorced": <Users size={20} />,
  };
  return (
    <OnboardingLayout title="Marital status" step={step} total={TOTAL} backHref={back}>
      <div className="space-y-2">
        {MARITAL_STATUSES.map((d) => (
          <OptionCard
            key={d}
            title={d}
            icon={icons[d]}
            selected={profile.maritalStatus === d}
            onClick={() => {
              patch({ maritalStatus: d });
              patchPrefs({ maritalStatus: d });
              goNext(router, "marital");
            }}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}

function Mangal({ step, back }: { step: number; back: string }) {
  const { profile, patch } = useProfile();
  const router = useRouter();
  return (
    <OnboardingLayout title="Mangal Dosh" step={step} total={TOTAL} backHref={back}>
      <div className="space-y-2">
        {MANGAL_DOSH.map((d) => (
          <OptionCard
            key={d.id}
            title={d.label}
            selected={profile.mangalDosh === d.label}
            onClick={() => {
              patch({ mangalDosh: d.label });
              goNext(router, "mangal");
            }}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}

function Occupation({ step, back }: { step: number; back: string }) {
  const { profile, patch } = useProfile();
  const router = useRouter();
  const icons: Record<string, ReactNode> = {
    "Not Applicable": <CircleSlash size={22} />,
    "Private Company": <Building2 size={22} />,
    "Government Job": <Briefcase size={22} />,
    "Defence Job": <Shield size={22} />,
    Business: <Store size={22} />,
    Student: <GraduationCap size={22} />,
  };
  return (
    <OnboardingLayout title="Occupation" step={step} total={TOTAL} backHref={back}>
      <div className="grid grid-cols-2 gap-3">
        {OCCUPATIONS.map((o) => (
          <IconTile
            key={o}
            title={o}
            icon={icons[o]}
            selected={profile.occupation === o}
            onClick={() => {
              patch({ occupation: o });
              goNext(router, "occupation");
            }}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}

function Salary({ step, back }: { step: number; back: string }) {
  const { profile, patch } = useProfile();
  const router = useRouter();
  return (
    <OnboardingLayout title="Monthly salary" step={step} total={TOTAL} backHref={back}>
      <div className="rounded-[16px] bg-[var(--ss-surface)] border border-[var(--ss-line)] px-4">
        {SALARIES.map((s) => (
          <SalaryRow
            key={s}
            title={s}
            selected={profile.monthlySalary === s}
            onClick={() => {
              patch({ monthlySalary: s });
              goNext(router, "salary");
            }}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}

function Company({ step, back }: { step: number; back: string }) {
  const { profile, patch } = useProfile();
  const router = useRouter();
  const [q, setQ] = useState(profile.companyLocation);
  const list = CITIES.filter((c) => c.toLowerCase().includes((q || "").toLowerCase())).slice(0, 8);
  return (
    <OnboardingLayout
      title="Company location"
      step={step}
      total={TOTAL}
      backHref={back}
      footer={
        <PrimaryButton
          disabled={!profile.companyLocation}
          onClick={() => router.push(nextOf("company"))}
        >
          Continue
        </PrimaryButton>
      }
    >
      <TextInput
        value={profile.companyLocation}
        onChange={(v) => {
          patch({ companyLocation: v });
          setQ(v);
        }}
        placeholder="City or work location"
      />
      <div className="mt-3 space-y-2">
        {list.map((c) => (
          <OptionCard
            key={c}
            title={c}
            selected={profile.companyLocation === c}
            onClick={() => {
              patch({ companyLocation: c });
              goNext(router, "company");
            }}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}

function Education({ step, back }: { step: number; back: string }) {
  const { profile, patch } = useProfile();
  const router = useRouter();
  return (
    <OnboardingLayout title="Education level" step={step} total={TOTAL} backHref={back}>
      <div className="space-y-2">
        {EDUCATIONS.map((e) => (
          <OptionCard
            key={e}
            title={e}
            selected={profile.education === e}
            onClick={() => {
              patch({ education: e });
              goNext(router, "education");
            }}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}

function Whatsapp({ step, back }: { step: number; back: string }) {
  const { profile, patch } = useProfile();
  const router = useRouter();
  return (
    <OnboardingLayout
      title="Get matching biodatas on WhatsApp instantly"
      step={step}
      total={TOTAL}
      backHref={back}
      footer={
        <div className="space-y-2">
          <PrimaryButton
            onClick={() => {
              patch({ whatsappOptIn: true });
              router.push(nextOf("whatsapp"));
            }}
          >
            Allow
          </PrimaryButton>
          <SecondaryButton
            onClick={() => {
              patch({ whatsappOptIn: false });
              router.push(nextOf("whatsapp"));
            }}
          >
            Later
          </SecondaryButton>
        </div>
      }
    >
      <div className="flex flex-col items-center text-center pt-4">
        <div className="h-[92px] w-[92px] rounded-[28px] bg-[#25D366] text-white flex items-center justify-center shadow-[0_14px_30px_rgba(37,211,102,0.28)]">
          <svg width="46" height="46" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 1.74.46 3.44 1.34 4.94L2 22l5.38-1.41a10 10 0 0 0 4.66 1.12h.01c5.46 0 9.89-4.4 9.89-9.85C21.94 6.4 17.5 2 12.04 2Zm5.76 14.16c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.12.1-1.81-.11-.42-.13-.95-.31-1.64-.6-2.89-1.25-4.77-4.16-4.92-4.35-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41.24-.27.64-.4 1.02-.4.12 0 .23 0 .33.01.3.01.44.03.64.5.24.58.82 2 .89 2.14.07.14.12.3.02.49-.09.2-.14.31-.27.48-.14.16-.29.36-.41.48-.14.14-.28.29-.12.56.16.27.7 1.16 1.5 1.88 1.04.93 1.9 1.22 2.2 1.36.27.12.43.1.6-.07.18-.18.75-.87.95-1.17.2-.3.4-.24.66-.14.27.09 1.7.8 2 .95.3.14.5.22.57.34.08.13.08.74-.16 1.42Z" />
          </svg>
        </div>
        <p className="mt-6 text-[15px] leading-relaxed text-[var(--ss-muted)] max-w-[300px]">
          We will send matching biodatas to +91 {profile.mobile || "your number"} on WhatsApp.
        </p>
        <p className="mt-3 text-[13px] text-[var(--ss-muted)] max-w-[280px]">
          You can turn this off later.
        </p>
      </div>
    </OnboardingLayout>
  );
}

function Photo({ step, back }: { step: number; back: string }) {
  const { profile, patch } = useProfile();
  const router = useRouter();
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

  return (
    <OnboardingLayout
      title="Profile picture (optional)"
      step={step}
      total={TOTAL}
      backHref={back}
      footer={
        <div className="space-y-2">
          <PrimaryButton onClick={() => router.push(nextOf("photo"))}>Continue</PrimaryButton>
          <SecondaryButton onClick={() => router.push(nextOf("photo"))}>Skip</SecondaryButton>
        </div>
      }
    >
      <p className="text-[13px] text-[var(--ss-muted)] mb-4">Add up to 6 photos</p>
      <div className="grid grid-cols-3 gap-2.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <label
            key={i}
            className="relative aspect-square rounded-[16px] border border-dashed border-[var(--ss-line)] bg-[var(--ss-surface)] overflow-hidden cursor-pointer flex items-center justify-center"
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
                <Plus size={22} />
                <span className="text-[10px] mt-1 font-medium">Photo {i + 1}</span>
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
    </OnboardingLayout>
  );
}

function Prefs1({ step, back }: { step: number; back: string }) {
  const router = useRouter();
  return (
    <OnboardingLayout
      title="What kind of matches are you looking for?"
      step={step}
      total={TOTAL}
      backHref={back}
      footer={<PrimaryButton onClick={() => router.push(nextOf("prefs-1"))}>Continue</PrimaryButton>}
    >
      <MatchPreferencesForm />
    </OnboardingLayout>
  );
}

function About({ step, back }: { step: number; back: string }) {
  const { profile, patch } = useProfile();
  const router = useRouter();
  return (
    <OnboardingLayout
      title="Tell about yourself (Optional)"
      step={step}
      total={TOTAL}
      backHref={back}
      footer={<PrimaryButton onClick={() => router.push(nextOf("about"))}>Continue</PrimaryButton>}
    >
      <textarea
        value={profile.about}
        onChange={(e) => patch({ about: e.target.value })}
        rows={7}
        placeholder="Write a few lines about yourself"
        className="w-full rounded-[16px] border border-[var(--ss-line)] bg-[var(--ss-surface)] p-4 text-[15px] leading-relaxed"
      />
      <PrivacyMessage>This is optional.</PrivacyMessage>
    </OnboardingLayout>
  );
}

function Premium({ step, back }: { step: number; back: string }) {
  const { patch } = useProfile();
  const router = useRouter();
  const benefits = [
    "Direct communication",
    "Know who liked your profile",
    "Fresh matching biodatas",
  ];
  return (
    <OnboardingLayout
      title="Become a Premium member"
      step={step}
      total={TOTAL}
      backHref={back}
      footer={
        <div className="space-y-2">
          <PrimaryButton
            onClick={() => {
              // Trial during onboarding does not clear the Home recharge banner
              patch({ isPremium: false, hasRecharged: false });
              router.push("/home");
            }}
          >
            START TRIAL
          </PrimaryButton>
          <SecondaryButton
            onClick={() => {
              patch({ isPremium: false, hasRecharged: false });
              router.push("/home");
            }}
          >
            Skip for now
          </SecondaryButton>
        </div>
      }
    >
      <div className="rounded-[22px] bg-[var(--ss-surface)] border border-[var(--ss-line)] overflow-hidden mb-3">
        <div className="px-5 pt-5 pb-4 text-center bg-[var(--ss-primary-soft)]">
          <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[var(--ss-primary)]">
            Special offer
          </p>
          <p className="font-display text-[56px] leading-none mt-2 text-[var(--ss-ink)]">₹1</p>
          <p className="text-[15px] font-semibold mt-2">For 1 day, then ₹299 / month</p>
        </div>
        <div className="px-5 py-4 space-y-3">
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-3">
              <span className="h-6 w-6 rounded-full bg-[var(--ss-verify-soft)] text-[var(--ss-verify)] flex items-center justify-center text-[12px] font-bold">
                ✓
              </span>
              <p className="text-[14px]">{b}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[16px] bg-[var(--ss-surface)] border border-[var(--ss-line)] px-4 py-3.5 flex items-center gap-3">
        <div className="h-11 w-11 rounded-[12px] bg-[#5f259f] text-white text-[11px] font-bold flex items-center justify-center">
          Pe
        </div>
        <div className="flex-1">
          <p className="text-[12px] text-[var(--ss-muted)]">Pay with</p>
          <p className="text-[15px] font-semibold">PhonePe</p>
        </div>
        <span className="text-[12px] font-semibold text-[#5f259f]">UPI</span>
      </div>
    </OnboardingLayout>
  );
}
