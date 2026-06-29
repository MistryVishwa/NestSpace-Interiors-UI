import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'
import { projects } from '@/lib/portfolio-data'

const BASE_URL = 'https://nestspace-interiors.vercel.app'

const STATIC_ROUTES = [
  '/',
  '/about',
  '/services',
  '/portfolio',
  '/designs',
  '/blog',
  '/contact',
  '/faq',
  '/privacy',
  '/terms',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1.0 : 0.9,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const portfolioRoutes: MetadataRoute.Sitemap = Object.keys(projects).map((id) => ({
    url: `${BASE_URL}/portfolio/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...portfolioRoutes, ...blogRoutes]
}
