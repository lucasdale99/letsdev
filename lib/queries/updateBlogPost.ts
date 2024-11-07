import { eq } from 'drizzle-orm';
import { db } from '../db';
import { SelectBlog, blogsTable } from '../schema';

export async function updatePost(id: SelectBlog['id'], data: Partial<Omit<SelectBlog, 'id'>>) {
  await db.update(blogsTable).set(data).where(eq(blogsTable.id, id));
}
