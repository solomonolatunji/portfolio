import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { BASE_URL } from './pageMeta'

/**
 * Metadata configuration factory for consistent meta tags across the site
 */
export const createMetaTags = (
  pageTitle: ComputedRef<string>,
  pageDescription: ComputedRef<string>,
  ogImage: ComputedRef<string>,
  currentPath: ComputedRef<string>
) => {
  return [
    // Basic meta tags
    {
      name: 'description',
      content: pageDescription,
    },

    // OpenGraph tags
    {
      property: 'og:title',
      content: pageTitle,
    },
    {
      property: 'og:description',
      content: pageDescription,
    },
    {
      property: 'og:image',
      content: ogImage,
    },
    {
      property: 'og:url',
      content: computed(() => `${BASE_URL}${currentPath.value}`),
    },
    {
      property: 'og:type',
      content: 'website',
    },

    // Twitter Card tags
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: pageTitle,
    },
    {
      name: 'twitter:description',
      content: pageDescription,
    },
    {
      name: 'twitter:image',
      content: ogImage,
    },
  ]
}

/**
 * Link configuration factory for consistent link tags across the site
 */
export const createLinkTags = (currentPath: ComputedRef<string>) => {
  return [
    // Canonical URL
    {
      rel: 'canonical',
      href: computed(() => `${BASE_URL}${currentPath.value}`),
    },
  ]
}
