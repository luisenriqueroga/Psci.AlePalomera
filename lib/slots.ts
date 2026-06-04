export const SERVICES = [
  "Terapia individual",
  "Terapia de pareja",
  "Psicología infantil",
  "Orientación vocacional",
  "Terapia online",
]

const WEEKDAY_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "15:00", "16:00", "17:00", "18:00",
]

const SATURDAY_SLOTS = ["09:00", "10:00", "11:00"]

export function getSlotsForDay(dateStr: string): string[] {
  const date = new Date(dateStr + "T12:00:00")
  const day = date.getDay()
  if (day === 0) return []
  if (day === 6) return SATURDAY_SLOTS
  return WEEKDAY_SLOTS
}
