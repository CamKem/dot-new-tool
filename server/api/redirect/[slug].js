import db from '../../../database/db';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug').toLowerCase();
  const stmt = db.prepare('SELECT user FROM records WHERE slug = ?');
  const record = await stmt.get(slug);

  return {
    exists: !!record,
    url: `https://twitter.com/direct_messages/create/${record.user}`,
  }
});
