// type TWeeday =

export interface IDateFormatOptions {
  weekday: "long" | "short" | "narrow" | undefined;
  month: "long" | "short" | "narrow" | "numeric" | "2-digit" | undefined;
  year: "numeric" | "2-digit" | undefined;
  day: "numeric" | "2-digit" | undefined;
  hour: "numeric" | "2-digit" | undefined;
  minute: "numeric";
  hour12: boolean | undefined;
  timeZoneName: "long" | "short" | "shortOffset" | "longOffset" | "shortGeneric" | "longGeneric" | undefined;
  dayPeriod: "long" | "short" | "narrow" | undefined;
  era: "long" | "short" | "narrow" | undefined;
}

interface IFormatDateProps {
  date: Date | string;
  options?: Partial<IDateFormatOptions>;
}

const opt: IDateFormatOptions = {
  weekday: "short",
  month: "short",
  year: "numeric",
  day: "numeric",
  hour: "numeric", // Numeric hour (12-hour clock)
  minute: "numeric",
  hour12: undefined,
  timeZoneName: "short",
  dayPeriod: undefined,
  era: undefined,
};

export const today = new Date().toISOString().split("T")[0];

export const formatDate = ({ date = today, options = opt }: IFormatDateProps) => {
  const covertedDate = new Date(date);
  return new Intl.DateTimeFormat("en-GB", options).format(covertedDate);
};
