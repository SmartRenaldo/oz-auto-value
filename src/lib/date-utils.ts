// src/lib/date-utils.ts

/**
 * Generates the 4 most recent completed quarters
 * @returns Array of quarter objects with quarter, year, and index properties
 */
export function getRecentQuarters(): {
  quarter: string;
  year: number;
  index: number;
}[] {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentQuarter = Math.floor(currentMonth / 3); // 0-3 for Q1-Q4

  // Define quarters
  const quarters = [
    { name: "Q1", index: 0 },
    { name: "Q2", index: 1 },
    { name: "Q3", index: 2 },
    { name: "Q4", index: 3 },
  ];

  // Start with the most recently completed quarter
  // (previous quarter from current, or Q4 of previous year if in Q1)
  const prevQuarterIndex = (currentQuarter - 1 + 4) % 4; // Convert to 0-3 range
  const prevQuarterYear = currentQuarter === 0 ? currentYear - 1 : currentYear;

  const result = [];

  // Get 4 quarters starting with the most recent completed one
  for (let i = 0; i < 4; i++) {
    const quarterIndex = (prevQuarterIndex - i + 4) % 4;
    const quarter = quarters[quarterIndex];

    // Calculate year
    // We need to reduce the year whenever we cross from Q1 to Q4 going backward
    let yearOffset = 0;
    if (i > 0) {
      for (let j = 1; j <= i; j++) {
        const thisQuarter = (prevQuarterIndex - j + 1 + 4) % 4;
        const nextQuarter = (prevQuarterIndex - j + 4) % 4;
        if (thisQuarter === 0 && nextQuarter === 3) {
          // If we go from Q1 to Q4
          yearOffset++;
        }
      }
    }

    const year = prevQuarterYear - yearOffset;

    result.push({
      quarter: quarter.name,
      year: year,
      index: quarterIndex,
    });
  }

  return result;
}

/**
 * Generate a formatted date string for a number of months ago
 * @param monthsAgo Number of months to go back
 * @param format Format ('short' | 'long')
 * @returns Formatted date string
 */
export function getRelativeMonthYear(
  monthsAgo: number,
  format: "short" | "long" = "short"
): string {
  const today = new Date();
  const relativeDate = new Date(
    today.getFullYear(),
    today.getMonth() - monthsAgo,
    1
  );

  return relativeDate.toLocaleDateString("en-AU", {
    month: format === "short" ? "short" : "long",
    year: format === "short" ? "2-digit" : "numeric",
  });
}

/**
 * Generate quarter label string with year (e.g., "Q1 2025")
 */
export function formatQuarter(quarter: {
  quarter: string;
  year: number;
}): string {
  return `${quarter.quarter} ${quarter.year}`;
}

/**
 * Calculate a dynamic date range based on the current date
 * @param startOffset Number of months from now for start date
 * @param endOffset Number of months from now for end date
 * @returns A formatted date range string
 */
export function getDynamicDateRange(
  startOffset: number,
  endOffset: number
): string {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() + startOffset);

  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + endOffset);

  const startLabel = startDate.toLocaleDateString("en-AU", {
    month: "short",
    year: "numeric",
  });
  const endLabel = endDate.toLocaleDateString("en-AU", {
    month: "short",
    year: "numeric",
  });

  return `${startLabel} - ${endLabel}`;
}
