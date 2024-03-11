import db from '../../../database/db';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const stmt = db.prepare('SELECT slug FROM records WHERE slug = ?');
  const record = await stmt.get(slug.toLowerCase());
  return { exists: !!record };
});
