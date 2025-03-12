import postgres from 'postgres';
import { PageComponent } from './defintions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchPageComponents(pageId: string): Promise<PageComponent[]> {
  try {
    const pageComponents: Promise<PageComponent[]> = sql`
    SELECT * FROM page_components WHERE landing_page_id = ${pageId}
    `;
    return pageComponents;
  } catch (error) {
    console.error('Error fetching page components:', error);
    return [];
  }
}
