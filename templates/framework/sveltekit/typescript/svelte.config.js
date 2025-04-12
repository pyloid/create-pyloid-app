import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'dist-front',
      assets: 'dist-front',
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
  },
};
export default config;
