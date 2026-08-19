"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  ChevronLeft,
  Heart,
  Hospital,
  MoonStar,
  UserRound,
  Users,
  Camera,
} from "lucide-react";
import { useProfile } from "@/lib/store";

function dash(v?: string | null) {
  return v && String(v).trim() ? v : "-";
}

function Section({
  id,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-5">
      <div className="flex items-center gap-2 mb-2 px-0.5">
        <Icon size={18} className="text-[var(--ss-primary)]" />
        <h2 className="flex-1 text-[15px] font-bold text-[var(--ss-ink)]">{title}</h2>
        <Link href={`/me/edit/${id}`} className="text-[13px] text-[var(--ss-muted)] font-medium">
          Update &gt;
        </Link>
      </div>
      <div className="rounded-[14px] border border-[var(--ss-line)] bg-[var(--ss-surface)] px-4 py-3 space-y-3">
        {children}
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-[12px] text-[var(--ss-muted)]">{label}</p>
      <p className="text-[14px] font-semibold text-[var(--ss-primary)] mt-0.5">{dash(value)}</p>
    </div>
  );
}

export default function EditProfileOverviewPage() {
  const { profile } = useProfile();
  const router = useRouter();
  const p = profile.matchPreferences;
  const location =
    p.states?.length > 0
      ? p.states.map((s) => (s.startsWith("All ") ? s : `All ${s}`)).join(", ")
      : "-";
  const heightRange = p.heightAllOk ? "All Ok" : `${p.heightMin} - ${p.heightMax}`;
  const educations =
    p.education === "All Ok" || (!p.educations?.length && !p.education)
      ? "All Ok"
      : p.educations?.length
        ? p.educations.join(", ")
        : p.education || "All Ok";
  const motherTongues =
    p.motherTongue === "All Ok" || (!p.motherTongues?.length && !p.motherTongue)
      ? "All Ok"
      : p.motherTongues?.length
        ? p.motherTongues.join(", ")
        : p.motherTongue || "All Ok";
  const ageLimit = `${p.ageMin} - ${p.ageMax}`;
  const photoCount = (profile.profilePhotos || []).filter(Boolean).length;

  return (
    <div className="flex flex-col h-full bg-[var(--ss-bg)]">
      <header className="safe-top px-4 pt-3 pb-3 shrink-0 flex items-center gap-2 border-b border-[var(--ss-line)] bg-[var(--ss-bg)]">
        <button
          type="button"
          onClick={() => router.push("/me")}
          className="h-9 w-9 flex items-center justify-center -ml-1"
          aria-label="Back"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-[18px] font-bold">Edit Profile</h1>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pt-4 pb-6">
        <Section id="basic" title="Basic details" icon={UserRound}>
          <Field label="Name" value={profile.name} />
          <Field label="Gender" value={profile.gender} />
          <Field label="Religion" value={profile.religion} />
          <Field label="Community" value={profile.caste} />
          <Field label="Mother tongue" value={profile.motherTongue} />
          <Field label="City" value={profile.city} />
          <Field label="Height" value={profile.height} />
          <Field label="Diet" value={profile.diet} />
          <Field label="Marital status" value={profile.maritalStatus} />
          <Field label="About" value={profile.about} />
        </Section>

        <Section id="photos" title="Photos" icon={Camera}>
          <Field label="Photos added" value={`${photoCount} / 6`} />
        </Section>

        <Section id="occupation" title="Occupation" icon={Briefcase}>
          <Field label="Occupation" value={profile.occupation} />
          <Field label="Education level" value={profile.education} />
          <Field label="Monthly salary" value={profile.monthlySalary} />
          <Field label="Company location" value={profile.companyLocation} />
          <Field label="Company name" value={profile.companyName} />
        </Section>

        <Section id="family" title="Family" icon={Users}>
          <Field label="Father's status" value={profile.fatherStatus} />
          <Field label="Mother's status" value={profile.motherStatus} />
          <Field label="Family place" value={profile.familyPlace} />
          <Field label="Family monthly salary" value={profile.familyMonthlySalary} />
          <Field label="Family property" value={profile.familyProperty} />
          <Field label="Family type" value={profile.familyType} />
          <Field label="Siblings" value={profile.siblings} />
        </Section>

        <Section id="astrology" title="Astrology" icon={MoonStar}>
          <Field label="Mangal Dosh" value={profile.mangalDosh} />
          <Field
            label="Date of Birth"
            value={
              profile.dateOfBirth
                ? profile.dateOfBirth.split("-").reverse().join(" / ")
                : undefined
            }
          />
          <Field label="Birth time" value={profile.birthTime} />
          <Field label="Place of birth" value={profile.placeOfBirth} />
        </Section>

        <Section id="health" title="Health" icon={Hospital}>
          <Field label="Drinks alcohol?" value={profile.drinksAlcohol} />
          <Field label="Smokes cigarettes?" value={profile.smokes} />
          <Field label="Have any health issue?" value={profile.healthIssue} />
          <Field label="Have any type of disability?" value={profile.disability} />
        </Section>

        <Section id="preferences" title="Preferences" icon={Heart}>
          <Field label="Age limit" value={ageLimit} />
          <Field label="Location" value={location} />
          <Field label="Height" value={heightRange} />
          <Field label="Diet" value={p.diet} />
          <Field label="Marital status" value={p.maritalStatus} />
          <Field label="Mother tongue" value={motherTongues} />
          <Field label="Mangal Dosh" value={p.mangalDosh} />
          <Field label="Occupation" value={p.occupation || "All Ok"} />
          <Field label="Monthly salary" value={p.monthlySalary || "All Ok"} />
          <Field label="Education level" value={educations} />
        </Section>
      </div>
    </div>
  );
}
