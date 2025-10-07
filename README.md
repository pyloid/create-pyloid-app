# create-pyloid-app

## Usage

```bash
npm create pyloid-app
```

```bash
bun create pyloid-app
```

```bash
yarn create pyloid-app
```

```bash
pnpm create pyloid-app
```

## Contributing

- Add Package Manager
- Add Framework

### Adding Framework

templates/framework/{framework}/{language}/

#### React + Typescript

1. delete .gitignore

2. add devDependencies

```json
"devDependencies": {
  ...
  "run-script-os": "^1.1.6",
  "npm-run-all": "^4.1.5"
}
```

3. update vite.config.js

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'build-front',
  },
});
```

4. add pyloid_icon.png

5. update App.tsx
