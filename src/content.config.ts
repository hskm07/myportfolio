import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    summary: z.string(),
    challenge: z.string(),
    focus: z.string(),
    illustration: z.enum(['team', 'server', 'code']).optional(),
    type: z.enum(['oss', 'personal-demo', 'professional-case']),
    context: z.enum(['career', 'freelance']).optional(),
    tags: z.array(z.string()),
    role: z.string(),
    order: z.number().int().positive(),
    label: z.string(),
    workflow: z.array(z.string()).length(3),
    workflowLabels: z.array(z.string()).length(3).default(['INPUT', 'PROCESS', 'OUTPUT']),
    workflowCaption: z.string().default('処理の概念図'),
    outcome: z.string(),
    publishedAt: z.coerce.date(),
    draft: z.boolean().default(true),
    anonymized: z.boolean().default(false),
    githubUrl: z.string().url().optional(),
    docsUrl: z.string().url().optional(),
  }).refine(data => data.type !== 'professional-case' || data.context !== undefined, {
    message: '実務事例にはcareerまたはfreelanceのcontextを指定してください',
    path: ['context'],
  }),
});

export const collections = { projects };
