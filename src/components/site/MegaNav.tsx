import { useEffect, useRef, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight, ChevronRight, FolderOpen, Library } from "lucide-react";
import { SECTIONS, type Section, type NodeItem } from "@/lib/platform";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBlogCategories, fetchBlogCards } from "@/store/blogSlice";
import logo1 from "@/assets/rb-logo.png";
export function MegaNav() {
  const [scrolled, setScrolled] = useState(false);
  const [openKey, setOpenKey] = useState<Section["key"] | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const SCROLL_THRESHOLD = 80; // Increased threshold to prevent jittering
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const shouldBeScrolled = currentY > SCROLL_THRESHOLD;
          
          // Only update state if it actually needs to change
          setScrolled(prev => {
            if (prev !== shouldBeScrolled) {
              return shouldBeScrolled;
            }
            return prev;
          });
          
          // Close dropdown on significant scroll
          if (Math.abs(currentY - lastY) > 15) {
            setOpenKey(null);
          }
          
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Set initial state
    onScroll();
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // Empty dependency array - no re-runs

  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && (setOpenKey(null), setMobileOpen(false));
    const onDocClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpenKey(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, []);

  const handleLabelClick = (e: React.MouseEvent, s: Section) => {
    e.preventDefault();
    if (openKey === s.key) {
      setOpenKey(null);
      navigate(s.to as never);
    } else {
      setOpenKey(s.key);
    }
  };

  const activeSection = SECTIONS.find((s) => s.key === openKey) ?? null;

  return (
    // <header
    //   ref={headerRef}
    //   className={`sticky top-0 z-50 ${scrolled ? "py-2" : "py-4"}`}
    // >
//   <header
//   ref={headerRef}
//   className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
//     scrolled ? "py-2" : "py-4"
//   }`}
// >
<header
  ref={headerRef}
  className="fixed top-0 left-0 right-0 z-50 w-full py-4 transition-all duration-300"
>
      <div className="container-rb">
        {/* <nav
          className={`rounded-2xl flex items-center justify-between ${
            scrolled
              ? "px-4 py-2 bg-background/90 backdrop-blur-xl border border-border/50 shadow-[var(--shadow-soft)]"
              : "px-5 py-3 glass"
          }`}
          aria-label="Primary"
        > */}
       <nav
  className={`rounded-2xl flex items-center justify-between px-5 py-3 transition-all duration-300 ${
    scrolled
      ? "bg-background/90 backdrop-blur-xl border border-border/50 shadow-[var(--shadow-soft)]"
      : "glass"
  }`}
  aria-label="Primary"
>
          <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Red Berry home">
            <img
              src={logo1}
              alt="Red Berry Corporate Services Corp"
              width={160}
              height={36}
              className="h-9 w-auto"
              // className={`${scrolled ? "h-7" : "h-9"} w-auto`}
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {SECTIONS.map((s) => (
              <li key={s.key}>
                <Link
                  to={s.to}
                  onClick={(e) => handleLabelClick(e, s)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg ${
                    openKey === s.key ? "text-foreground bg-foreground/5" : "text-foreground/75 hover:text-foreground"
                  }`}
                  aria-expanded={openKey === s.key}
                  aria-haspopup="true"
                >
                  {s.label}
                  <span
                    className={`inline-block w-1 h-1 rounded-full ${
                      openKey === s.key ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                    style={{ background: "var(--berry)" }}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/about/contact"
              className="px-4 py-2 text-sm text-foreground/80 hover:text-foreground"
            >
              Talk To An Advisor
            </Link>
            <Link
              to="/blueprint-tool"
              className="px-4 py-2 text-sm font-medium rounded-xl text-primary-foreground shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)]"
              style={{ background: "var(--gradient-berry)" }}
            >
              Architect My Blueprint
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-foreground/5"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </div>

      {/* Floating Infrastructure Navigator Panel */}
      <div
        className={`hidden lg:block absolute left-0 right-0 top-full px-0 ${
          activeSection ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="container-rb pt-3">
          {activeSection && <NavigatorPanel section={activeSection} onClose={() => setOpenKey(null)} />}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl animate-rise overflow-y-auto">
          <div className="container-rb pt-6 pb-16">
            <div className="flex items-center justify-between">
              <img src={logo1} alt="Red Berry" className="h-9 w-auto" />
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-foreground/5" aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-8 space-y-2">
              {SECTIONS.map((s) => (
                <details key={s.key} className="group rounded-2xl glass overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                    <span className="text-xl font-display">{s.label}</span>
                    <ChevronRight className="h-5 w-5 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-5 space-y-1">
                    <Link to={s.to} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-foreground/70">
                      {s.panelTitle} →
                    </Link>
                    {s.groups.flatMap((g) => g.items).map((item) => (
                      <Link
                        key={item.slug}
                        to={`${s.to}/${item.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-start gap-3 py-2.5 border-t border-border/40"
                      >
                        <item.icon className="h-4 w-4 mt-0.5 shrink-0" style={{ color: item.accent === "berry" ? "var(--berry)" : "var(--azure)" }} />
                        <div>
                          <div className="text-sm font-medium">{item.title}</div>
                          <div className="text-xs text-foreground/55">{item.tagline}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                to="/blueprint-tool"
                onClick={() => setMobileOpen(false)}
                className="px-5 py-4 text-center text-base font-medium rounded-xl text-primary-foreground"
                style={{ background: "var(--gradient-berry)" }}
              >
                Architect My Blueprint
              </Link>
              <Link
                to="/about/contact"
                onClick={() => setMobileOpen(false)}
                className="px-5 py-4 text-center text-base rounded-xl border border-border"
              >
                Talk To An Advisor
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavigatorPanel({ section, onClose }: { section: Section; onClose: () => void }) {
  const dispatch = useAppDispatch();
  const { blogCategories, blogCategoriesLoading } = useAppSelector((state) => state.blog);
  const [dynamicItems, setDynamicItems] = useState<NodeItem[]>([]);

  useEffect(() => {
    // Only fetch categories for Resources Hub section
    // We'll check each category individually for blogs
    if (section.key === 'resources-hub') {
      console.log('🔄 Fetching categories for Resources Hub dropdown...');
      dispatch(fetchBlogCategories());
    }
  }, [section.key, dispatch]);

  useEffect(() => {
    // For Resources Hub, check which categories have blogs
    if (section.key === 'resources-hub' && blogCategories.length > 0) {
      console.log('=== MEGANAV DYNAMIC CATEGORIES ===');
      console.log('Blog categories from API:', blogCategories);
      
      // Since the /api/Blog/Cards endpoint doesn't return category information,
      // we need to check each category individually to see if it has blogs
      const checkCategoriesWithBlogs = async () => {
        const categoriesWithBlogs: typeof blogCategories = [];
        
        console.log('\n📂 Checking which categories have blogs...');
        
        for (const category of blogCategories) {
          try {
            console.log(`\n🔍 Checking category: "${category.name}" (${category.slug})`);
            
            const response = await fetch(
              `${import.meta.env.VITE_API_URL || 'https://api.redberry.ae/api'}/Blog/Cards?categorySlug=${encodeURIComponent(category.slug)}`
            );
            
            if (response.ok) {
              const data = await response.json();
              const blogCount = data.data?.length || 0;
              
              console.log(`  → Found ${blogCount} blog(s)`);
              
              if (blogCount > 0) {
                categoriesWithBlogs.push(category);
                console.log(`  ✅ Has blogs - adding to dropdown`);
              } else {
                console.log(`  ❌ No blogs - skipping`);
              }
            }
          } catch (error) {
            console.error(`  ❌ Error checking category ${category.slug}:`, error);
          }
        }
        
        console.log('\n✅ Categories with blogs:', categoriesWithBlogs);
        
        // Convert to NodeItem format
        const items = categoriesWithBlogs.map((category, index) => ({
          slug: category.slug,
          title: category.name,
          tagline: category.description || "Resources and insights.",
          icon: FolderOpen,
          accent: (index % 2 === 0 ? "berry" : "azure") as "berry" | "azure",
        }));

        // ALWAYS add "Ambition Library" as the first item
        const itemsWithLibrary = [
          {
            slug: "ambition-library",
            title: "The Ambition Library",
            tagline: "All resources and insights from every category.",
            icon: Library,
            accent: "berry" as "berry" | "azure",
          },
          ...items
        ];

        console.log('\n🎯 Final dynamic items for MegaNav:', itemsWithLibrary);
        console.log('=== END MEGANAV DYNAMIC CATEGORIES ===\n');

        setDynamicItems(itemsWithLibrary);
      };
      
      checkCategoriesWithBlogs();
    } else if (section.key === 'resources-hub') {
      console.log('⏳ MEGANAV WAITING FOR DATA');
      console.log('  - blogCategories.length:', blogCategories.length);
    }
  }, [section.key, blogCategories]);

  // Determine what to display
  const displayGroups = useMemo(() => {
    // For Resources Hub, ALWAYS use dynamic items (even if empty)
    // This ensures we never show hardcoded dummy data
    if (section.key === 'resources-hub') {
      // If we have dynamic items, use them
      if (dynamicItems.length > 0) {
        return [{ items: dynamicItems }];
      }
      // If no dynamic items yet, return empty array (will show "No categories")
      // This prevents showing the hardcoded RESOURCES_HUB items
      return [];
    }
    // For other sections, use their static groups
    return section.groups;
  }, [section.key, section.groups, dynamicItems]);

  // Show loading state for Resources Hub
  const showLoading = blogCategoriesLoading && section.key === 'resources-hub';

  return (
    <div className="rounded-3xl bg-white border border-border/60 shadow-[var(--shadow-lift)] overflow-hidden animate-rise max-w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr]">
        {/* Left: contextual brief */}
        <aside className="relative p-6 lg:p-8 lg:border-r border-b lg:border-b-0 border-border/50 blueprint-grid">
          <div className="relative">
            <div className="text-[10px] tracking-[0.22em] uppercase text-foreground/55">{section.panelKicker}</div>
            <h3 className="mt-3 text-xl lg:text-2xl font-display text-gradient leading-tight">{section.panelTitle}</h3>
            <p className="mt-3 text-sm text-foreground/65 leading-relaxed">{section.panelDescription}</p>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                to={section.to}
                onClick={onClose}
                className="inline-flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium border border-border/60 hover:bg-foreground/5 transition-colors"
              >
                Open {section.label} hub
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              {section.cta && (
                <Link
                  to={section.cta.to}
                  onClick={onClose}
                  className="inline-flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-primary-foreground"
                  style={{ background: "var(--gradient-berry)" }}
                >
                  {section.cta.label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            {/* Decorative infrastructure schematic */}
            <svg viewBox="0 0 200 80" className="mt-8 w-full max-w-full opacity-70" aria-hidden>
              <defs>
                <linearGradient id="ln" x1="0" x2="1">
                  <stop offset="0" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.6" />
                  <stop offset="1" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <line x1="10" y1="40" x2="190" y2="40" stroke="url(#ln)" strokeWidth="1" />
              {[20, 60, 100, 140, 180].map((x, i) => (
                <g key={x}>
                  <circle cx={x} cy="40" r="3.5" fill="oklch(0.99 0 0)" stroke={i % 2 ? "oklch(0.62 0.16 240)" : "oklch(0.55 0.20 25)"} />
                  <line x1={x} y1="20" x2={x} y2="60" stroke="oklch(0.6 0.05 250)" strokeWidth="0.5" strokeDasharray="2 2" />
                </g>
              ))}
            </svg>
          </div>
        </aside>

        {/* Right: nodes */}
        <div className="p-4 lg:p-6">
          {showLoading && (
            <div className="text-center py-8 text-foreground/60">Loading categories...</div>
          )}
          
          {!showLoading && displayGroups.map((g, gi) => (
            <div key={gi} className={gi > 0 ? "mt-5 pt-5 border-t border-border/40" : ""}>
              {g.heading && (
                <div className="px-2 pb-3 text-[10px] tracking-[0.22em] uppercase text-foreground/50">{g.heading}</div>
              )}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {g.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`${section.to}/${item.slug}`}
                      onClick={onClose}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-foreground/[0.04] transition-colors"
                    >
                      <span
                        className="shrink-0 grid place-items-center w-9 h-9 rounded-lg border border-border/60 bg-card group-hover:shadow-[var(--shadow-soft)] transition-shadow"
                        style={{
                          color: item.accent === "berry" ? "var(--berry)" : "var(--azure)",
                        }}
                      >
                        <item.icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </span>
                        <span className="block text-xs text-foreground/55 leading-snug line-clamp-2">{item.tagline}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {!showLoading && displayGroups.length === 0 && (
            <div className="text-center py-8 text-foreground/60">No categories available.</div>
          )}
        </div>
      </div>
    </div>
  );
}
