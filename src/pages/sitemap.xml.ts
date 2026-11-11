import type { APIRoute } from 'astro';
import { getPublishedProjects } from '../lib/projects';
import { pathTo } from '../config/site';
export const GET: APIRoute = async ({ site }) => {
  const projects = await getPublishedProjects();
  const urls = ['', ...projects.map(p => `projects/${p.id}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(p => `<url><loc>${new URL(pathTo(p), site).href}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
