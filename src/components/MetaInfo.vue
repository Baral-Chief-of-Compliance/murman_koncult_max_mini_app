<script setup>
import { useMeta } from 'quasar'
import { onMounted } from 'vue';

import { useMetaStore } from 'src/stores/meta-store';

const metaStore = useMetaStore()

const metaData = {
  // sets document title
  title: metaStore.titel,
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title} - Кадровый навигатор 51`,

  // meta tags
  meta: {
    description: { name: 'description', content: 'Кадровый навигатор 51' },
    keywords: { name: 'keywords', content: 'Кадровый навигатор 51' },
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8'
    },
    language: {
        'http-equiv': 'Content-Language',
        content: 'ru'  // Указываем русский язык
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle) {
        return `${ogTitle} - Кадровый навигатор 51`
      }
    }
  },

  // CSS tags
  link: {
    material: {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
    }
  },

  // JS tags
  script: {
    ldJson: {
      type: 'application/ld+json',
      innerHTML: `{ "@context": "http://schema.org" }`
    }
  },

  // <html> attributes
  htmlAttr: {
    'xmlns:cc': 'http://creativecommons.org/ns#', // generates <html xmlns:cc="http://creativecommons.org/ns#">,
    empty: undefined // generates <html empty>
  },

  // <body> attributes
  bodyAttr: {
    'action-scope': 'xyz', // generates <body action-scope="xyz">
    empty: undefined // generates <body empty>
  },

  // <noscript> tags
  noscript: {
    default: 'This is content for browsers with no JS (or disabled JS)'
  }
}

onMounted(() => {
    useMeta(metaData)
})

</script>