export const ageCalculator = (date_of_birth) => {
  const dob = new Date(date_of_birth);
  const month_diff = Date.now() - dob.getTime();
  const age_dt = new Date(month_diff);
  const year = age_dt.getUTCFullYear();
  return Math.abs(year - 1970);
};
