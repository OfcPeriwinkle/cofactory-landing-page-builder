import postgres from 'postgres';
import { BaseComponent, FetchedPageComponent } from './defintions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchBaseComponents(): Promise<BaseComponent[]> {
  try {
    const baseComponents: Promise<BaseComponent[]> = sql`
        SELECT * FROM base_components
        `;
    return baseComponents;
  } catch (error) {
    console.error('Error fetching base components:', error);
    return [];
  }
}

export async function fetchPageComponents(pageId: string): Promise<FetchedPageComponent[]> {
  try {
    const pageComponents: Promise<FetchedPageComponent[]> = sql`
    SELECT page_components.id, order_index, base_components.name as base_component_name, props FROM page_components
    JOIN base_components ON page_components.base_component_id = base_components.id
    WHERE landing_page_id = ${pageId}
    `;
    return pageComponents;
  } catch (error) {
    console.error('Error fetching page components:', error);
    return [];
  }
}
