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
    ORDER BY order_index
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

export async function updatePageComponent(
  landingPageId: string,
  pageComponentId: string,
  props: object
): Promise<void> {
  try {
    await sql.begin(async (sql) => {
      await sql`
        UPDATE page_components
        SET props = ${JSON.stringify(props)}, updated_at = NOW()
        WHERE id = ${pageComponentId}
        `;

      await sql`
          UPDATE pages
          SET updated_at = NOW()
          WHERE id = ${landingPageId}`;
    });
  } catch (error) {
    console.error('Error updating page component:', error);
  }
}

export async function deletePageComponent(
  landingPageId: string,
  pageComponentId: string
): Promise<void> {
  try {
    await sql.begin(async (sql) => {
      await sql`
        DELETE FROM page_components
        WHERE id = ${pageComponentId}
        `;

      await sql`
            UPDATE pages
            SET updated_at = NOW()
            WHERE id = ${landingPageId}`;
    });
  } catch (error) {
    console.error('Error deleting page component:', error);
  }
}

export async function fetchLandingPages() {
  try {
    const landingPages = await sql`
      SELECT * FROM pages
      ORDER BY updated_at DESC
      `;
    return landingPages;
  } catch (error) {
    console.error('Error fetching landing pages:', error);
    return [];
  }
}
