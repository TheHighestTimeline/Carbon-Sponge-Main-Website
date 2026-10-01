# Carbon Sponge website

Static multi-page site built with Vite, React and Tailwind CSS, deployed on Netlify.

## Pages

| URL | HTML entry | Page component |
| --- | --- | --- |
| `/` | `index.html` | `src/pages/Home.jsx` |
| `/how-we-work/` | `how-we-work/index.html` | `src/pages/HowWeWork.jsx` |
| `/services/` | `services/index.html` | `src/pages/Services.jsx` |
| `/about/` | `about/index.html` | `src/pages/About.jsx` |
| `/book-a-call/` | `book-a-call/index.html` | `src/pages/BookACall.jsx` |
| `/privacy/` | `privacy/index.html` | `src/pages/Privacy.jsx` |
| 404 | `404.html` | `src/pages/NotFound.jsx` |

Each HTML file holds that page's title, meta description, canonical URL and Open Graph tags.

## Motion

- GSAP + ScrollTrigger + SplitText for reveals, pinning and line drawing (`src/lib/motion.js`)
- Lenis smooth scroll, synced to ScrollTrigger
- Three.js particle field on the Home hero only, lazy loaded (`src/lib/particles.js`)
- Everything falls back to simple fades with `prefers-reduced-motion`

## Book a Call form

The form posts to Netlify Forms (form name `book-a-call`, honeypot `bot-field`) and also emails
each request to `tanner@carbonsponge.io` through FormSubmit. The first submission triggers a one-time
activation email from FormSubmit to that inbox; click the link in it to start receiving requests.

## Develop

```
npm install
npm run dev
npm run build
```
