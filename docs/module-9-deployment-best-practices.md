# Module 9: Deployment and Best Practices

Duration: 2 hours

Topics:

- Topic 35: Building production-ready applications
- Topic 36: Deploying to Vercel and Netlify
- Topic 37: Performance optimization basics
- Topic 38: Debugging and developer tools

## Learning Objectives

By the end of this module, students should be able to:

- Explain the difference between development mode and production mode.
- Build a React/Vite project for production.
- Deploy a frontend project to Vercel.
- Deploy a frontend project to Netlify.
- Fix common deployment errors.
- Use browser developer tools to debug API, routing, console, and performance problems.
- Apply simple performance best practices before sharing a project.

## Prerequisites

Students should already have:

- A completed React project.
- `package.json` with a working `build` script.
- Git installed.
- A GitHub account.
- A Vercel account or Netlify account.
- Basic understanding of React Router and Axios.

## 2-Hour Class Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0-10 min | Recap | Review React project, routes, Axios calls, and environment setup |
| 10-30 min | Production-ready apps | Explain build, folder structure, env variables, and cleanup |
| 30-60 min | Vercel deployment | Teacher demo: push to GitHub and deploy on Vercel |
| 60-80 min | Netlify deployment | Teacher demo: deploy the same project on Netlify |
| 80-100 min | Performance basics | Run build, inspect bundle, check images, network, and Lighthouse |
| 100-115 min | Debugging tools | Use Console, Network, React DevTools, and common deployment fixes |
| 115-120 min | Assignment brief | Students deploy their own project and submit links |

## 35. Building Production-Ready Applications

A development app is used while coding. A production app is optimized and ready to be hosted online.

### Development Mode

```bash
npm run dev
```

Use development mode while writing code. It gives fast reload, detailed errors, and local development server support.

### Production Build

```bash
npm run build
```

For a Vite project, this creates a `dist` folder. The `dist` folder contains optimized HTML, CSS, JavaScript, and assets that can be deployed to hosting platforms.

### Preview Production Build Locally

```bash
npm run preview
```

Use preview after build to check how the app behaves like a deployed production app.

### Production Checklist

Before deploying:

- Remove unused imports.
- Remove unnecessary `console.log`.
- Make sure all routes work.
- Make sure all buttons work.
- Make sure API calls use the correct URL.
- Make sure form validation is acceptable.
- Make sure images are not too large.
- Run `npm run build` and fix all build errors.
- Test the production preview.

### Environment Variables

Environment variables store values that may change between local development and production.

In Vite, browser-accessible environment variables should start with `VITE_`.

Example `.env` file:

```txt
VITE_API_BASE_URL=https://dummyjson.com
```

Use it in React:

```jsx
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

axios.get(`${apiBaseUrl}/products`)
```

Important: Do not put private passwords or secret backend keys in frontend environment variables. Frontend variables are visible in the browser after build.

## 36. Deploying to Vercel and Netlify

### Prepare Project For Deployment

Check `package.json`.

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Run:

```bash
npm install
npm run build
```

If the build passes, the project is ready for deployment.

### Push Project To GitHub

```bash
git init
git add .
git commit -m "Initial React project"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

If your project is already connected to GitHub, only run:

```bash
git add .
git commit -m "Prepare project for deployment"
git push
```

### Deploy To Vercel Using GitHub

Steps:

1. Go to Vercel.
2. Click **Add New Project**.
3. Import your GitHub repository.
4. Select the React/Vite project.
5. Keep or confirm these settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
6. Add environment variables if your app uses them.
7. Click **Deploy**.

After deployment, Vercel gives a live URL ending in `.vercel.app`.

### Deploy To Vercel Using CLI

Install Vercel CLI:

```bash
npm install -g vercel
```

Deploy preview:

```bash
vercel
```

Deploy production:

```bash
vercel --prod
```

### React Router Refresh Fix For Vercel

If direct page refresh fails on routes like `/productList` or `/studentDetails/1`, add `vercel.json` in the project root.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

Then commit and redeploy.

### Deploy To Netlify Using GitHub

Steps:

1. Go to Netlify.
2. Click **Add new project**.
3. Choose your GitHub repository.
4. Keep or confirm these settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables if your app uses them.
6. Click **Deploy**.

After deployment, Netlify gives a live URL ending in `.netlify.app`.

### Deploy To Netlify Using CLI

Install Netlify CLI:

```bash
npm install netlify-cli -g
```

Initialize and connect the project:

```bash
netlify init
```

Deploy production after build:

```bash
npm run build
netlify deploy --prod --dir=dist
```

### React Router Refresh Fix For Netlify

If direct page refresh fails on routes like `/productList` or `/studentDetails/1`, create this file:

```txt
public/_redirects
```

Add:

```txt
/* /index.html 200
```

Then run build again and redeploy.

## 37. Performance Optimization Basics

Performance means how fast and smooth the app feels to users.

### Basic Performance Checklist

- Use production build before sharing the app.
- Compress large images.
- Use correct image sizes.
- Avoid unnecessary API calls.
- Avoid too many `console.log` statements.
- Use stable keys in lists, for example `key={product.id}`.
- Show loading states while data is loading.
- Show error states when API calls fail.
- Avoid rendering very large lists without pagination or filtering.

### Image Optimization

Bad:

```jsx
<img src="/large-image.png" />
```

Better:

```jsx
<img src="/product-image.webp" alt="Product" width="300" />
```

Use smaller images when the UI only needs a small display size.

### Avoid Extra API Calls

Be careful with `useEffect` dependencies.

```jsx
useEffect(() => {
  getProducts()
}, [])
```

The empty dependency array means the API call happens once when the component loads.

### Use Loading State

```jsx
const [loading, setLoading] = useState(false)

const getProducts = async () => {
  setLoading(true)
  const response = await axios.get("https://dummyjson.com/products")
  setProductList(response.data)
  setLoading(false)
}
```

Show it in JSX:

```jsx
{loading && <p>Loading...</p>}
```

### Use Error State

```jsx
const [error, setError] = useState("")

const getProducts = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products")
    setProductList(response.data)
  } catch (err) {
    setError("Something went wrong while loading products.")
  }
}
```

Show it in JSX:

```jsx
{error && <p>{error}</p>}
```

## 38. Debugging and Developer Tools

Debugging means finding and fixing problems in the app.

### Browser Console

Use Console to check:

- JavaScript errors.
- Missing imports.
- Undefined variables.
- Failed event handlers.
- Temporary `console.log` output.

Example:

```jsx
console.log(response.data)
```

Remove unnecessary logs before final deployment.

### Network Tab

Use Network to check:

- Whether API requests are being sent.
- Request method: `GET`, `POST`, `PUT`, `DELETE`.
- Request URL.
- Response status, for example `200`, `404`, `500`.
- Response data.

Common API status codes:

| Status | Meaning |
| --- | --- |
| 200 | Success |
| 201 | Created |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 500 | Server error |

### React Developer Tools

Use React DevTools to inspect:

- Component tree.
- Props.
- State.
- Re-renders.
- Performance with Profiler.

### Common Deployment Problems

| Problem | Possible Cause | Fix |
| --- | --- | --- |
| Build failed | Syntax error or missing import | Run `npm run build` locally and fix the error |
| Blank page | Wrong base path, broken asset, or runtime error | Check Console and build output |
| API not working | Wrong URL or blocked request | Check Network tab |
| Route refresh gives 404 | SPA routing needs rewrite rule | Add Vercel rewrite or Netlify `_redirects` |
| Env variable undefined | Missing env variable in hosting dashboard | Add variable and redeploy |
| Works locally but not deployed | Local-only file or config missing | Push all files and check build logs |

## Teacher Demo Flow

Use one React/Vite project and deploy it twice:

1. Run `npm run build`.
2. Run `npm run preview`.
3. Push project to GitHub.
4. Deploy to Vercel.
5. Test all routes on Vercel.
6. Deploy to Netlify.
7. Test all routes on Netlify.
8. Show one intentional error and debug it from build logs or browser Console.

## Student Activity

Students should deploy one of their React projects.

They must submit:

- GitHub repository link.
- Vercel live link or Netlify live link.
- Screenshot of successful deployment.
- Short note explaining one issue they faced and how they fixed it.

## Assignment

Deploy your latest React CRUD project.

Requirements:

- Project must run locally with `npm run dev`.
- Project must build successfully with `npm run build`.
- Project must be pushed to GitHub.
- Project must be deployed on Vercel or Netlify.
- All main routes must work.
- Direct refresh on nested routes must work.
- Forms and buttons must work.
- API calls must work.
- Project should not show console errors.

Bonus:

- Deploy the same project to both Vercel and Netlify.
- Add loading and error states.
- Add a simple 404 page.
- Add responsive CSS.
- Compare the Lighthouse score before and after optimization.

## Quick Revision Questions

1. What is the difference between `npm run dev` and `npm run build`?
2. What folder does Vite create after a production build?
3. What is the build command for a Vite React project?
4. What is the publish/output directory for Vite?
5. Why can a React Router page show 404 after refresh?
6. Which DevTools tab helps inspect API requests?
7. Which DevTools tab helps inspect React state and props?
8. Why should we remove unnecessary `console.log` before deployment?

## Reference Links

- Vite production build: https://vite.dev/guide/build.html
- Vite CLI build and preview: https://vite.dev/guide/cli
- Vercel Vite deployment: https://vercel.com/docs/frameworks/frontend/vite
- Vercel deploy CLI: https://vercel.com/docs/cli/deploy
- Netlify Vite deployment: https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/
- React Developer Tools: https://react.dev/learn/react-developer-tools
- Chrome DevTools Performance panel: https://developer.chrome.com/docs/devtools/performance/overview
- Chrome DevTools Network panel: https://developer.chrome.com/docs/devtools/network/overview
