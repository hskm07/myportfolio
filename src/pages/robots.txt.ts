import type { APIRoute } from 'astro';
import { pathTo } from '../config/site';
export const GET: APIRoute = ({ site }) => new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL(pathTo('sitemap.xml'), site).href}\n`, { headers: { 'Content-Type': 'text/plain' } });
