import postgres from 'postgres';
import { PageComponent } from './defintions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchPageComponents(pageId: string): Promise<PageComponent[]> {
  try {
    const pageComponents: Promise<PageComponent[]> = sql`
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
