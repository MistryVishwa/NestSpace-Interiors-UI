export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  category: string
  author: string
  content: {
    intro: string
    sections: { heading: string; body: string[] }[]
    conclusion: string
  }
}

export const blogPosts: BlogPost[] = [
  {
    slug: "interior-design-trends-2024",
    title: "Top Interior Design Trends to Watch in 2024",
    excerpt:
      "Discover the latest trends shaping the world of interior design this year, from sustainable materials to biophilic design elements.",
    image: "/images/portfolio-6.jpg",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Trends",
    author: "NestSpace Editorial",
    content: {
      intro:
        "Interior design in 2024 is defined by warmth, personality, and intentional living. Homeowners are moving away from generic spaces and embracing interiors that feel curated, natural, and deeply functional.",
      sections: [
        {
          heading: "Warm Minimalism",
          body: [
            "Minimalism is evolving into a softer and more inviting style. Clean lines still matter, but spaces now include layered textures, warm neutrals, and handcrafted details.",
            "This trend works beautifully in living rooms, bedrooms, and lounges where comfort matters just as much as aesthetics.",
          ],
        },
        {
          heading: "Natural Materials",
          body: [
            "Wood, stone, limewash, rattan, linen, and terracotta are being used to create interiors with timeless depth.",
            "These materials bring visual richness while also helping a space feel grounded and premium.",
          ],
        },
        {
          heading: "Statement Lighting",
          body: [
            "Lighting is becoming a focal design element instead of only a functional necessity.",
            "Oversized pendants, layered sconces, and sculptural fixtures can instantly elevate a room and create mood.",
          ],
        },
      ],
      conclusion:
        "The strongest trend of all is designing spaces that feel personal. Instead of following trends blindly, choose ideas that support your lifestyle, reflect your taste, and stand the test of time.",
    },
  },
  {
    slug: "sustainable-materials-guide",
    title: "A Guide to Sustainable Materials in Interior Design",
    excerpt:
      "Learn how to make eco-friendly choices without compromising on style or quality.",
    image: "/images/portfolio-1.jpg",
    date: "March 10, 2024",
    readTime: "6 min read",
    category: "Sustainability",
    author: "NestSpace Editorial",
    content: {
      intro:
        "Sustainable design is no longer a niche preference. It is becoming a core part of how thoughtful interiors are planned, sourced, and built.",
      sections: [
        {
          heading: "Choose Durable Over Disposable",
          body: [
            "The most sustainable material is often the one that lasts the longest. Durable finishes reduce the need for frequent replacement and lower long-term waste.",
            "Solid wood, natural stone, and high-quality fabrics often offer better lifecycle value than cheaper synthetic alternatives.",
          ],
        },
        {
          heading: "Look for Low-VOC Finishes",
          body: [
            "Paints, adhesives, and sealants with low VOC levels help improve indoor air quality.",
            "This matters especially in bedrooms, kids’ rooms, and compact homes where ventilation may be limited.",
          ],
        },
        {
          heading: "Support Responsible Sourcing",
          body: [
            "Work with vendors that can explain where their materials come from and how they are produced.",
            "Sourcing transparency often leads to better quality control and more ethical purchasing decisions.",
          ],
        },
      ],
      conclusion:
        "Sustainable interiors do not need to feel restrictive. With the right choices, they can be elegant, luxurious, and healthier for everyday living.",
    },
  },
  {
    slug: "small-space-solutions",
    title: "Maximizing Small Spaces: Design Tips for Apartments",
    excerpt:
      "Creative solutions for making the most of limited square footage.",
    image: "/images/portfolio-5.jpg",
    date: "March 5, 2024",
    readTime: "5 min read",
    category: "Tips",
    author: "NestSpace Editorial",
    content: {
      intro:
        "Small apartments can feel refined and spacious when design decisions are deliberate. Good planning makes every square foot work harder without sacrificing comfort.",
      sections: [
        {
          heading: "Use Multi-Functional Furniture",
          body: [
            "Beds with storage, nesting tables, ottomans, and expandable dining furniture help reduce clutter while improving usability.",
            "Pieces that serve two purposes are especially valuable in studio apartments and compact bedrooms.",
          ],
        },
        {
          heading: "Create Visual Height",
          body: [
            "Curtains mounted close to the ceiling, tall shelving, and vertical wall treatments can make rooms appear larger.",
            "This simple strategy improves proportions without changing the floor plan.",
          ],
        },
        {
          heading: "Keep the Palette Cohesive",
          body: [
            "A limited color palette helps small spaces feel calm and visually continuous.",
            "Use contrast intentionally through texture, lighting, and accents instead of too many competing colors.",
          ],
        },
      ],
      conclusion:
        "Smart apartment design is less about size and more about clarity. When layout, storage, and style align, compact homes can feel incredibly premium.",
    },
  },
  {
    slug: "color-psychology",
    title: "The Psychology of Color in Interior Design",
    excerpt:
      "How different colors affect mood and how to use them effectively in your home.",
    image: "/images/portfolio-4.jpg",
    date: "February 28, 2024",
    readTime: "7 min read",
    category: "Design Theory",
    author: "NestSpace Editorial",
    content: {
      intro:
        "Color influences mood, focus, comfort, and even how large or intimate a room feels. Choosing the right palette is one of the most powerful parts of interior design.",
      sections: [
        {
          heading: "Soft Neutrals for Calm",
          body: [
            "Warm whites, taupes, and muted beiges create a restful backdrop that works in nearly every room.",
            "They also allow furniture, art, and textures to stand out more gracefully.",
          ],
        },
        {
          heading: "Deep Tones for Character",
          body: [
            "Charcoal, forest green, navy, and chocolate brown can make spaces feel rich and cocooning.",
            "These shades are especially effective in lounges, dining areas, and accent walls.",
          ],
        },
        {
          heading: "Strategic Accent Colors",
          body: [
            "Terracotta, olive, muted rust, and soft gold can introduce warmth without overwhelming a space.",
            "Use them through upholstery, cushions, art, or decorative objects for a more balanced result.",
          ],
        },
      ],
      conclusion:
        "The best palettes feel intentional and emotionally appropriate for the room. Good color planning can quietly transform the entire experience of a home.",
    },
  },
  {
    slug: "kitchen-renovation-guide",
    title: "Complete Guide to Kitchen Renovation",
    excerpt:
      "Everything you need to know before starting your kitchen renovation project.",
    image: "/images/portfolio-2.jpg",
    date: "February 20, 2024",
    readTime: "10 min read",
    category: "Guides",
    author: "NestSpace Editorial",
    content: {
      intro:
        "A kitchen renovation is one of the most valuable upgrades you can make, but it needs careful planning to balance function, aesthetics, and budget.",
      sections: [
        {
          heading: "Plan Workflow First",
          body: [
            "Before selecting finishes, focus on how the kitchen will be used. Storage zones, appliance placement, and circulation patterns matter more than surface-level styling.",
            "A beautiful kitchen only succeeds when it is easy to work in every day.",
          ],
        },
        {
          heading: "Prioritize Storage",
          body: [
            "Pull-out systems, tall units, corner solutions, and drawer organization make a huge difference in usability.",
            "Good storage reduces visual noise and helps the kitchen feel premium and efficient.",
          ],
        },
        {
          heading: "Choose Finishes That Age Well",
          body: [
            "Timeless cabinetry colors, durable countertops, and high-quality hardware usually outperform trend-driven selections over time.",
            "A balanced design ensures the kitchen still looks relevant years after installation.",
          ],
        },
      ],
      conclusion:
        "The best kitchen renovations combine smart planning with refined detailing. When function leads the process, the final result feels both luxurious and practical.",
    },
  },
  {
    slug: "office-design-productivity",
    title: "How Office Design Impacts Productivity",
    excerpt:
      "Research-backed insights on creating workspaces that boost focus and creativity.",
    image: "/images/portfolio-3.jpg",
    date: "February 15, 2024",
    readTime: "6 min read",
    category: "Commercial",
    author: "NestSpace Editorial",
    content: {
      intro:
        "Office design directly shapes how teams think, collaborate, and perform. A well-designed workspace can improve focus while also supporting comfort and culture.",
      sections: [
        {
          heading: "Lighting and Focus",
          body: [
            "Natural light and layered task lighting reduce fatigue and help employees stay more alert throughout the day.",
            "Even small improvements in lighting quality can significantly upgrade the working experience.",
          ],
        },
        {
          heading: "Acoustic Comfort",
          body: [
            "Noise is one of the biggest productivity disruptors in modern offices.",
            "Soft finishes, zoning strategies, acoustic panels, and flexible layouts help create a healthier balance between collaboration and concentration.",
          ],
        },
        {
          heading: "Brand and Well-Being",
          body: [
            "A workspace should feel aligned with the brand while still being comfortable enough for daily use.",
            "When employees feel proud of their environment, engagement and retention often improve as well.",
          ],
        },
      ],
      conclusion:
        "Great office design is not decoration. It is a strategic investment in performance, team morale, and long-term business identity.",
    },
  },
  {
    slug: "luxury-bathroom-trends",
    title: "Luxury Bathroom Design: Creating Your Personal Spa",
    excerpt:
      "Transform your bathroom into a relaxing retreat with these design ideas.",
    image: "/images/portfolio-4.jpg",
    date: "February 10, 2024",
    readTime: "5 min read",
    category: "Luxury",
    author: "NestSpace Editorial",
    content: {
      intro:
        "Luxury bathrooms are no longer just about premium finishes. They are about atmosphere, comfort, and creating a private retreat within the home.",
      sections: [
        {
          heading: "Material Elegance",
          body: [
            "Stone-look surfaces, fluted details, brushed metals, and warm wood tones can instantly elevate the space.",
            "The goal is to create visual depth without overcrowding the design.",
          ],
        },
        {
          heading: "Layered Lighting",
          body: [
            "Vanity lighting, ambient glow, and accent lighting around niches or mirrors can turn a functional room into a spa-like experience.",
            "Lighting should flatter the space and support both routine use and relaxation.",
          ],
        },
        {
          heading: "Thoughtful Comfort",
          body: [
            "Heated elements, generous storage, larger mirrors, and tactile finishes all contribute to a more indulgent experience.",
            "Luxury often comes from well-resolved details rather than excess.",
          ],
        },
      ],
      conclusion:
        "A spa-inspired bathroom succeeds when every element feels calm, cohesive, and intentional. The result should be restorative, timeless, and beautifully finished.",
    },
  },
]

export const featuredPost = blogPosts[0]

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}