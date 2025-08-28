export interface OvitrapData {
  counting_id: number;
  ovitrap_id: string;
  ovitrap_website_id: number;
  eggs: number;
  week: number;
  year: number;
  date: string;
  date_collect: string;
  time: string;
  latitude: number;
  longitude: number;
  municipality: string;
  municipality_code: string;
  state_code: string;
  state_name: string;
  district: string;
  street: string;
  number: string;
  complement: string;
  loc_inst: string;
  sector: string | null;
  user: string;
}
