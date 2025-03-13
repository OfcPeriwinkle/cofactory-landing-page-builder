import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { users, pages, baseComponents, pageComponents } from '@/app/lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
      CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
      );`;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
              INSERT INTO users (id, name, email, password)
              VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
              ON CONFLICT (id) DO NOTHING;
            `;
    })
  );

  return insertedUsers;
}

async function seedLandingPages() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
      CREATE TABLE IF NOT EXISTS pages (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW(),
          title TEXT NOT NULL,
          description TEXT
      );`;

  const insertedPages = await Promise.all(
    pages.map(async (page) => {
      return sql`
                  INSERT INTO pages (id, user_id, created_at, updated_at, title, description)
                  VALUES (${page.id}, ${page.user_id}, ${page.created_at}, ${page.updated_at}, ${page.title}, ${page.description})
                  ON CONFLICT (id) DO NOTHING;
                `;
    })
  );

  return insertedPages;
}

async function seedPageComponents() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
      CREATE TABLE IF NOT EXISTS page_components (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          landing_page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
          base_component_id UUID NOT NULL REFERENCES base_components(id) ON DELETE CASCADE,
          order_index INTEGER NOT NULL, -- Defines component order in the page
          content JSONB NOT NULL DEFAULT '{}',
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
      );`;

  const insertedPageComponents = await Promise.all(
    pageComponents.map(async (pageComponent) => {
      return sql`
                  INSERT INTO page_components (id, landing_page_id, created_at, updated_at, order_index, base_component_id, props)
                  VALUES (
                    ${pageComponent.id},
                    ${pageComponent.landing_page_id},
                    ${pageComponent.created_at},
                    ${pageComponent.updated_at},
                    ${pageComponent.order_index},
                    ${pageComponent.base_component_id},
                    ${JSON.stringify(pageComponent.props)}
                  )
                  ON CONFLICT (id) DO NOTHING;
                `;
    })
  );

  return insertedPageComponents;
}

async function seedBaseComponents() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
      CREATE TABLE IF NOT EXISTS base_components (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name TEXT NOT NULL UNIQUE,
          friendly_name TEXT NOT NULL UNIQUE
      );`;

  const insertedBaseComponents = await Promise.all(
    baseComponents.map(async (baseComponent) => {
      return sql`
                  INSERT INTO base_components (id, name, friendly_name)
                  VALUES (${baseComponent.id}, ${baseComponent.name}, ${baseComponent.friendly_name})
                  ON CONFLICT (id) DO NOTHING;
                `;
    })
  );

  return insertedBaseComponents;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedLandingPages(),
      seedBaseComponents(),
      seedPageComponents(),
    ]);
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
