export type CustomerProps = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address?: string | null;
  created_at?: Date;
  updated_at?: Date;
  userId?: string | null;
};
