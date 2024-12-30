export interface TicketProps {
  id: string;
  name: string;
  status: string;
  description: string;
  updated_at: Date | null;
  created_at: Date | null;
  customerId: string | null;
  userId: string | null;
}
