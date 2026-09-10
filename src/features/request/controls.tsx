"use client";

import { useId, type ReactNode } from "react";

/**
 * Controles reutilizáveis do Request (§196): uma única implementação,
 * usada no hero, nas páginas e no painel completo.
 */

/* ------------------------------ QuantityStepper ----------------------------- */

export function QuantityStepper({
  value,
  onChange,
  labels,
  min = 1,
  max = 500,
  compact = false,
}: {
  value: number;
  onChange: (value: number) => void;
  labels: { decrease: string; increase: string; input: string };
  min?: number;
  max?: number;
  compact?: boolean;
}) {
  const id = useId();
  const clamp = (v: number) => Math.min(max, Math.max(min, Number.isFinite(v) ? Math.round(v) : min));
  const size = compact ? "h-10 w-10 text-lg" : "h-12 w-12 text-xl";
  return (
    <div className="inline-flex items-stretch border border-ink-800 bg-ink-900" role="group" aria-label={labels.input}>
      <button
        type="button"
        aria-label={labels.decrease}
        onClick={() => onChange(clamp(value - 1))}
        className={`${size} flex items-center justify-center border-r border-ink-700 text-paper-50 transition-colors duration-150 hover:bg-ink-700 active:bg-ink-600`}
      >
        −
      </button>
      <label htmlFor={id} className="sr-only">
        {labels.input}
      </label>
      <input
        id={id}
        inputMode="numeric"
        pattern="[0-9]*"
        value={String(value)}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          if (raw === "") return;
          onChange(clamp(Number(raw)));
        }}
        onBlur={(e) => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          onChange(clamp(raw === "" ? min : Number(raw)));
        }}
        className={`tnum ${compact ? "w-14 text-base" : "w-16 text-lg"} border-0 bg-transparent text-center font-bold text-paper-50 focus:bg-ink-800`}
      />
      <button
        type="button"
        aria-label={labels.increase}
        onClick={() => onChange(clamp(value + 1))}
        className={`${size} flex items-center justify-center border-l border-ink-700 text-paper-50 transition-colors duration-150 hover:bg-ink-700 active:bg-ink-600`}
      >
        +
      </button>
    </div>
  );
}

/* -------------------------------- OptionCard -------------------------------- */

export function OptionCard({
  selected,
  onSelect,
  title,
  hint,
  name,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  hint?: string;
  name: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      data-option={name}
      onClick={onSelect}
      className={`flex w-full flex-col items-start gap-1 border p-4 text-left transition-colors duration-150 ${
        selected
          ? "border-signal-500 bg-ink-900 text-paper-50"
          : "border-line-300 bg-paper-50 text-ink-950 hover:border-ink-600"
      }`}
    >
      <span className="text-base font-bold">{title}</span>
      {hint ? (
        <span className={`text-sm ${selected ? "text-steel-300" : "text-ink-600"}`}>{hint}</span>
      ) : null}
    </button>
  );
}

/* ---------------------------------- Field ----------------------------------- */

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <span id={`${id}-label`} className="text-sm font-bold text-ink-800">
        {label}
      </span>
      <div aria-labelledby={`${id}-label`}>{children}</div>
      {hint ? <span className="text-xs text-steel-500">{hint}</span> : null}
      {error ? (
        <span role="alert" className="text-sm font-semibold text-signal-600">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  error,
  autoComplete,
  inputMode,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  maxLength?: number;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-ink-800">
        {label}
        {required ? <span aria-hidden="true" className="text-signal-600"> *</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 border border-line-300 bg-paper-50 px-3 text-base text-ink-950 placeholder:text-steel-400 focus:border-ink-800"
      />
      {error ? (
        <span role="alert" className="text-sm font-semibold text-signal-600">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  hint,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  hint?: string;
  maxLength?: number;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-ink-800">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className="border border-line-300 bg-paper-50 p-3 text-base text-ink-950 placeholder:text-steel-400 focus:border-ink-800"
      />
      {hint ? <span className="text-xs text-steel-500">{hint}</span> : null}
    </div>
  );
}

/* ------------------------------- TriStateRadio ------------------------------ */

export function TriStateRadio<T extends string>({
  value,
  onChange,
  options,
  groupLabel,
}: {
  value: T | null;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  groupLabel: string;
}) {
  return (
    <div role="radiogroup" aria-label={groupLabel} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={`h-11 border px-4 text-sm font-semibold transition-colors duration-150 ${
              selected
                ? "border-signal-500 bg-ink-900 text-paper-50"
                : "border-line-300 bg-paper-50 text-ink-800 hover:border-ink-600"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
