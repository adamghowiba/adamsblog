import { join } from 'path';
import { readFile } from 'fs/promises';
import { compileMDX } from 'next-mdx-remote/rsc';

async function parseMdx<Frontmatter>(rawMdx: string) {
  return await compileMDX<Frontmatter>({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          // preProcess,
          // rehypeCodeTitles,
          // rehypePrism,
          // rehypeSlug,
          // rehypeAutolinkHeadings,
          // postProcess,
        ],
        // remarkPlugins: [remarkGfm],
      },
    },
    // components,
  });
}

export async function retrieveDocument(slug: string) {
  try {
    const contentPath = getDocsContentPath(slug);
    const rawMdx = await readFile(contentPath, 'utf-8');

    return await parseMdx(rawMdx);
  } catch (err) {
    console.log(err);
  }
}

export const getDocsContentPath = (slug: string) => {
  const contentPath = join(process.cwd(), 'src/content/', `${slug}.mdx`);
  return contentPath;
};
