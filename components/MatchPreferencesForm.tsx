"use client";

import { useState } from "react";
import {
  DIETS,
  EDUCATIONS,
  HEIGHTS,
  MARITAL_STATUSES,
  MOTHER_TONGUES,
  OCCUPATIONS,
  SALARIES,
  STATES,
} from "@/lib/constants";
import { useProfile } from "@/lib/store";
import { AgeRange, SearchField, SelectionChip } from "@/components/ui";

const ALL_OK = "All Ok";

export function MatchPreferencesForm() {
  const { profile, patchPrefs } = useProfile();
  const p = profile.matchPreferences;
  const selectedStates = p.states || [];
  const [stateQuery, setStateQuery] = useState("");

  const filteredStates = (
    stateQuery
      ? STATES.filter((s) => s.toLowerCase().includes(stateQuery.toLowerCase()))
      : STATES
  ).slice(0, 12);

  function toggleState(state: string) {
    const next = selectedStates.includes(state)
      ? selectedStates.filter((s) => s !== state)
      : [...selectedStates, state];
    patchPrefs({ states: next, city: "" });
  }

  return (
    <>
      <p className="text-[12px] font-semibold mb-2">Age</p>
      <div className="rounded-[16px] border border-[var(--ss-line)] bg-[var(--ss-surface)] px-4 py-3 mb-5">
        <AgeRange
          min={18}
          max={50}
          low={p.ageMin}
          high={p.ageMax}
          onChange={(low, high) => patchPrefs({ ageMin: low, ageMax: high })}
        />
      </div>
      <p className="text-[12px] font-semibold mb-2">Want profiles from other castes?</p>
      <div className="flex gap-2 mb-4">
        {["Yes", "No"].map((v) => (
          <SelectionChip
            key={v}
            selected={p.openToOtherCaste === v}
            onClick={() => patchPrefs({ openToOtherCaste: v })}
          >
            {v}
          </SelectionChip>
        ))}
      </div>
      <p className="text-[12px] font-semibold mb-2">State</p>
      <p className="text-[12px] text-[var(--ss-muted)] -mt-1 mb-2">You can select more than one</p>
      <SearchField value={stateQuery} onChange={setStateQuery} placeholder="Search state" />
      {selectedStates.length > 0 ? (
        <div className="flex flex-wrap gap-2 mt-2 mb-2">
          {selectedStates.map((s) => (
            <SelectionChip key={s} selected onClick={() => toggleState(s)}>
              {s} ×
            </SelectionChip>
          ))}
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2 mt-2 mb-4">
        {filteredStates.map((s) => (
          <SelectionChip
            key={s}
            selected={selectedStates.includes(s)}
            onClick={() => toggleState(s)}
          >
            {s}
          </SelectionChip>
        ))}
      </div>

      <p className="text-[12px] font-semibold mb-2">Marital status</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {[ALL_OK, ...MARITAL_STATUSES].map((v) => (
          <SelectionChip
            key={v}
            selected={(p.maritalStatus || ALL_OK) === v}
            onClick={() => patchPrefs({ maritalStatus: v })}
          >
            {v}
          </SelectionChip>
        ))}
      </div>

      <p className="text-[12px] font-semibold mb-2">Mother tongue</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {[ALL_OK, ...MOTHER_TONGUES.slice(0, 8)].map((v) => (
          <SelectionChip
            key={v}
            selected={(p.motherTongue || ALL_OK) === v}
            onClick={() => patchPrefs({ motherTongue: v, motherTongues: v === ALL_OK ? [] : [v] })}
          >
            {v}
          </SelectionChip>
        ))}
      </div>

      <p className="text-[12px] font-semibold mb-2">Monthly salary</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {[ALL_OK, ...SALARIES].map((v) => (
          <SelectionChip
            key={v}
            selected={(p.monthlySalary || ALL_OK) === v}
            onClick={() => patchPrefs({ monthlySalary: v })}
          >
            {v}
          </SelectionChip>
        ))}
      </div>

      <p className="text-[12px] font-semibold mb-2">Occupation</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {[ALL_OK, ...OCCUPATIONS].map((v) => (
          <SelectionChip
            key={v}
            selected={(p.occupation || ALL_OK) === v}
            onClick={() => patchPrefs({ occupation: v })}
          >
            {v}
          </SelectionChip>
        ))}
      </div>

      <p className="text-[12px] font-semibold mb-2">Education level</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {[ALL_OK, ...EDUCATIONS].map((v) => (
          <SelectionChip
            key={v}
            selected={
              v === ALL_OK
                ? !p.education || p.education === ALL_OK || (p.educations || []).length === 0
                : p.education === v || (p.educations || []).includes(v)
            }
            onClick={() =>
              patchPrefs(
                v === ALL_OK
                  ? { education: ALL_OK, educations: [] }
                  : { education: v, educations: [v] }
              )
            }
          >
            {v}
          </SelectionChip>
        ))}
      </div>

      <p className="text-[12px] font-semibold mb-2">Height</p>
      <div className="flex flex-wrap gap-2 mb-2">
        <SelectionChip
          selected={p.heightAllOk}
          onClick={() => patchPrefs({ heightAllOk: true })}
        >
          {ALL_OK}
        </SelectionChip>
        <SelectionChip
          selected={!p.heightAllOk}
          onClick={() => patchPrefs({ heightAllOk: false })}
        >
          Set range
        </SelectionChip>
      </div>
      {!p.heightAllOk ? (
        <div className="flex gap-3 mb-4">
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
      ) : (
        <div className="mb-4" />
      )}

      <p className="text-[12px] font-semibold mb-2">Diet</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {[ALL_OK, ...DIETS].map((v) => (
          <SelectionChip
            key={v}
            selected={(p.diet || ALL_OK) === v}
            onClick={() => patchPrefs({ diet: v })}
          >
            {v}
          </SelectionChip>
        ))}
      </div>

      <p className="text-[12px] font-semibold mb-2">Mangal Dosh</p>
      <div className="flex flex-wrap gap-2 pb-2">
        {[ALL_OK, "No", "Yes", "Anshik", "Don't know"].map((v) => (
          <SelectionChip
            key={v}
            selected={(p.mangalDosh || ALL_OK) === v}
            onClick={() => patchPrefs({ mangalDosh: v })}
          >
            {v}
          </SelectionChip>
        ))}
      </div>
    </>
  );
}
