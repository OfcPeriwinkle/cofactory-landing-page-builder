export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type LandingPage = {
  id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  title: string;
  description: string;
};

export type PageComponent = {
  id: string;
  landing_page_id: string;
  created_at: Date;
  updated_at: Date;
  order_index: number;
  base_component_id: string;
  props: object;
};

export type BaseComponent = {
  id: string;
  name: string;
  friendly_name: string;
};
