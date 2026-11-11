import { getCollection, type CollectionEntry } from 'astro:content';

export const projectTypes = {
  oss: '公開OSS',
  'personal-demo': '自主制作デモ',
  'professional-case': '開発実績（匿名）',
};

export function getProjectCategory(project: CollectionEntry<'projects'>) {
  if (project.data.type === 'professional-case') {
    return project.data.context === 'career' ? '本業での担当実績（匿名）' : '副業での対応事例（匿名）';
  }
  return projectTypes[project.data.type];
}

export async function getPublishedProjects() {
  const projects = await getCollection('projects', ({ data }) =>
    !data.draft && (data.type !== 'professional-case' || data.anonymized),
  );
  return projects.sort((a, b) => a.data.order - b.data.order);
}
