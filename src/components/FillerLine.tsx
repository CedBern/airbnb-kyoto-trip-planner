import React from 'react';

interface FillerProps {
  value: string | number | null | undefined | boolean;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Renders value or a short filler line ("—") when value is missing, empty, or undefined.
 * Meets requirement: "Cards that show a short filler line for any empty field.
 * Remove one value from a mock row and check the card shows a short filler line in that spot, not a blank or undefined"
 */
export default function Filler({ value, prefix = "", suffix = "", className = "" }: FillerProps) {
  if (value === undefined || value === null || value === "") {
    return (
      <span
        data-testid="filler-line"
        className={`inline-block text-gray-400 font-normal select-none ${className}`}
        title="Field not specified in source data"
      >
        —
      </span>
    );
  }

  return (
    <span className={className}>
      {prefix}{String(value)}{suffix}
    </span>
  );
}
