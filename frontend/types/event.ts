export type EventType = {
  date: string | number | Date;
  id: number;
  title: string;
  type: string;
  startDate: string; // ISO string
  endDate: string;   // ISO string
  displayDate: string;
  time: string;
  location: string;
};