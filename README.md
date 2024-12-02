# create-pyloid-app

## Usage

```bash
npm create pyloid
```
```bash
bun create pyloid
```
```bash
yarn create pyloid
```
```bash
pnpm create pyloid
```

## Contributing

- Add Package Manager
- Add Framework

### Adding Package Manager

templates/package-manager/{package-manager}/{language}/package.scripts.json

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

4. update src/main.tsx

```tsx
document.addEventListener('pyloidReady', () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
```

5. add pyloid_icon.png

6. update App.tsx
