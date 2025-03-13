import { User, LandingPage, PageComponent, BaseComponent } from '@/app/lib/defintions';

export const users: User[] = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

export const pages: LandingPage[] = [
  {
    id: '34373006-2c64-45cd-8fbc-87a14ea2fd64',
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    created_at: new Date('2025-03-12'),
    updated_at: new Date('2025-03-12'),
    title: 'My First Page',
    description: 'My first attempt at using this jank tool!',
  },
  {
    id: '66fdc201-0023-48ce-8c56-a92b21479f94',
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    created_at: new Date('2025-03-12'),
    updated_at: new Date('2025-03-12'),
    title: 'Really Cool Page',
    description: 'Another landing page',
  },
];

export const baseComponents: BaseComponent[] = [
  {
    id: 'd7e1a8f4-9c8a-4e0d-8e2c-4d0b6c8c5c5d',
    name: 'hero',
    friendly_name: 'Hero',
  },
  {
    id: '1f3b4b1e-3f9c-4b2b-9d0b-3f5d9c0b4b1e',
    name: 'footer',
    friendly_name: 'Footer',
  },
];

export const pageComponents: PageComponent[] = [
  {
    id: '560e6eda-c7da-405c-b065-410c15a1f8fc',
    landing_page_id: '34373006-2c64-45cd-8fbc-87a14ea2fd64',
    created_at: new Date('2025-03-12'),
    updated_at: new Date('2025-03-12'),
    order_index: 0,
    base_component_id: 'd7e1a8f4-9c8a-4e0d-8e2c-4d0b6c8c5c5d',
    props: {
      title: 'Welcome to the site!',
      subtitle: 'This is a subtitle',
    },
  },
  {
    id: '560e6eda-c7da-405c-b065-410c15a1f8fc',
    landing_page_id: '34373006-2c64-45cd-8fbc-87a14ea2fd64',
    created_at: new Date('2025-03-12'),
    updated_at: new Date('2025-03-12'),
    order_index: 1,
    base_component_id: '1f3b4b1e-3f9c-4b2b-9d0b-3f5d9c0b4b1e',
    props: {
      title: 'Footer',
      subtitle: 'This is a subtitle',
    },
  },
];
