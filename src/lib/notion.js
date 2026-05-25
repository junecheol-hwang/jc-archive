const NOTION_API_KEY = import.meta.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = import.meta.env.NOTION_DATABASE_ID;

export async function getPosts() {
  const response = await fetch(
    `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          property: 'published',
          checkbox: { equals: true },
        },
        sorts: [
          { property: 'date', direction: 'descending' },
        ],
      }),
    }
  );

  const data = await response.json();
  console.log('Notion response:', JSON.stringify(data, null, 2));

  if (!data.results) {
    console.error('No results:', data);
    return [];
  }

  return data.results.map((page) => ({
    id: page.id,
    title: page.properties.Title?.title[0]?.plain_text ?? '제목 없음',
    category: page.properties.category?.select?.name ?? '',
    date: page.properties.date?.date?.start ?? '',
    slug: page.properties.slug?.rich_text[0]?.plain_text ?? page.id,
  }));
}