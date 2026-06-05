# 🏡 NestSpace — Modern Interior Design Portfolio

[![SSoC Season 5](https://img.shields.io/badge/SSoC-2026-orange.svg?style=flat-square)](https://socialsummerofcode.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-blue.svg?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-blue.svg?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.2-38bdf8.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/package_manager-pnpm-lightgrey.svg?style=flat-square&logo=pnpm)](https://pnpm.io/)

**NestSpace** is a premium, high-fidelity interior design showcase and portfolio platform. Focused on visual excellence, it exhibits modern residential and commercial spaces, interior styling workflows, creative design galleries, blogs, and contact options. It is engineered with Next.js 16, React 19, Radix UI primitives, and Tailwind CSS v4 to deliver smooth transitions and a sleek user experience.

🌐 **Demo / Deployment**: [NestSpace on Vercel](https://github.com/MistryVishwa/NestSpace-Interiors-UI) (Host URL managed by Project Admin)

---

## 🎨 Visual Aesthetics & Motion

* **Tailwind CSS v4 Utilities**: Implementing fluid grid systems, variable spacing, custom animation keys, and elegant color systems.
* **Radix UI Primitives**: Fully accessible, style-agnostic components (Accordion, Hover Card, Tabs, Tooltip, Dialog, Navigation Menu) customized to fit our clean styling guide.
* **Micro-Animations**: Powered by `tw-animate-css` and native CSS transitions to create responsive hover actions and fade-in entries on load.

---

## 🚀 Key Features & Pages

* **📐 Interactive Design Galleries**: Showcases high-resolution concepts categorized by rooms (Kitchen, Living Room, Bedroom) and styles (Minimalist, Classic, Modern).
* **🛠️ Services Showcase**: Details spatial planning, custom furniture styling, commercial lighting, and color consulting options.
* **🖼️ Portfolio Grid**: High-fidelity project showcase featuring realistic interior project layouts.
* **✍️ Interior Design Blog**: Expert tips on spatial design, modern aesthetics, and architectural trends.
* **📩 Seamless Inquiries**: Fully structured contact and request forms.
* **📱 Responsive Layouts**: Carefully engineered to look beautiful on mobile, tablet, and desktop screens.

---

## 🛠️ Technology Stack

* **Framework**: Next.js 16.2 (App Router, TypeScript)
* **Rendering & UI**: React 19.2 (Functional Components)
* **Styling**: Tailwind CSS v4.2, PostCSS v8, Autoprefixer
* **Components & Access**: Radix UI Primitives, Lucide React Icons, React Day Picker
* **Forms & Validations**: React Hook Form, Zod schema resolvers

---

## 📂 Project Structure

```
NestSpace-Interiors-UI-main/
├── app/                      # Next.js App Router Structure
│   ├── about/                # About company details
│   ├── blog/                 # Design tips & posts
│   ├── contact/              # Support & quotes inquiry
│   ├── designs/              # Custom design previewer
│   ├── portfolio/            # Projects gallery showcase
│   ├── services/             # Specific service details
│   ├── privacy/ & terms/     # Policy documentation
│   ├── globals.css           # Global stylesheets (Tailwind v4 imports)
│   ├── layout.tsx            # Main HTML layout wrapper
│   └── page.tsx              # Home landing route
├── components/               # Accessible layout structures
│   ├── ui/                   # Custom Radix adapters (Accordion, Dropdown, etc.)
│   └── icons.tsx             # Custom svg assets
├── hooks/                    # Reusable React hooks
├── lib/                      # Helper libraries & theme controllers
├── styles/                   # Auxiliary styles & modules
├── public/                   # Static files (images, logos, icons)
├── package.json              # App scripts & dependencies
└── tsconfig.json             # TypeScript compile properties
```

---

## 🏁 Local Installation & Development

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher) and [pnpm](https://pnpm.io/) installed.

### 2. Clone the Repository
```bash
git clone https://github.com/MistryVishwa/NestSpace-Interiors-UI.git
cd NestSpace-Interiors-UI
```

### 3. Install Dependencies
This project uses **pnpm** as its primary package manager:
```bash
pnpm install
```

### 4. Run the Project
Start the Next.js development server locally:
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build & Lint
To check for syntax errors and build the static output bundle:
```bash
pnpm lint
pnpm build
```

---

## 🗺️ Roadmap & Planned Enhancements

* [ ] **3D Space Viewer**: Embed interactive WebGL or canvas-based 3D room preview models.
* [ ] **Quote Cost Calculator**: Provide an approximate budget planner matching room size and interior theme selections.
* [ ] **Live Chat Integration**: Connect real-time customer support chat widgets.

---

## 🤝 Contribution Guidelines
To contribute to NestSpace, check out [CONTRIBUTING.md](CONTRIBUTING.md) to understand claiming tasks, branch conventions, and how to create clean PR submissions.
