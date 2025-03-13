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

export async function insertPageComponent(
  landingPageId: string,
  baseComponentId: string,
  orderIndex: number,
  props?: object
): Promise<number | null> {
  try {
    const result = await sql`
      INSERT INTO page_components (landing_page_id, base_component_id, order_index, props)
      VALUES (${landingPageId}, ${baseComponentId}, ${orderIndex}, ${JSON.stringify(props) || '{}'})
      RETURNING id
      `;
    return result[0].id;
  } catch (error) {
    console.error('Error creating page component:', error);
    return null;
  }
}
