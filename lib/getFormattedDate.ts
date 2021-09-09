import { format } from "date-fns"

export const getFormattedDate = (date?: string): string | null => {
  return date ? format(new Date(date), 'yyyy-MM-dd h:mm:ss') : null
}
