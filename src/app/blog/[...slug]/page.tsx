import { retrieveDocument } from '@/utils/markdown.util';

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;

  const document = await retrieveDocument(slug.join('/'));

  return (
    <div>
      <h1 className="text-3xl">{document?.frontmatter?.title}</h1>
      <p className="text-muted-foreground">{document?.frontmatter?.description}</p>

      {document?.content}
    </div>
  );
}
