import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, PenSquare, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
    title: 'Home | NextPro',
    description: 'Welcome to NextPro! Explore a variety of articles, insights, and stories from our authors. Stay updated with the latest trends and topics in our engaging content.',
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
      {/* 1. Hero Section (قسم الترحيب الرئيسي) */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 max-w-5xl mx-auto space-y-8">
        
        {/* شارة مميزة عائمة */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/50 text-xs md:text-sm font-medium text-muted-foreground animate-in fade-in-50">
          <Sparkles className="h-3.5 w-3.5 text-blue-500" />
          <span>Welcome to the future of content sharing</span>
        </div>

        {/* العنوان الرئيسي والفرعي */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Welcome to <span className="text-blue-500">NextPro</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            This is our space to create, share, and discover inspiring content. Join our growing community of writers and readers today.
          </p>
        </div>

        {/* أزرار الدعوة للإجراء (CTA Buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link 
            href="/blog" 
            className={buttonVariants({ variant: "default", size: "lg" }) + " gap-2 shadow-md hover:shadow-lg transition-all"}
          >
            <BookOpen className="h-4 w-4" />
            <span>Explore Articles</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link 
            href="/create" 
            className={buttonVariants({ variant: "outline", size: "lg" }) + " gap-2"}
          >
            <PenSquare className="h-4 w-4" />
            <span>Start Writing</span>
          </Link>
        </div>

        {/* 2. Features Grid (عرض بسيط للمميزات) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full pt-16 border-t mt-16">
          <div className="p-6 rounded-xl border bg-card/50 space-y-2">
            <h3 className="font-semibold text-lg text-foreground">Read & Learn</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover diverse topics, deep dives, and tutorials curated by talented creators.
            </p>
          </div>
          <div className="p-6 rounded-xl border bg-card/50 space-y-2">
            <h3 className="font-semibold text-lg text-foreground">Create Easily</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Express your ideas effortlessly using our sleek and modern post editor.
            </p>
          </div>
          <div className="p-6 rounded-xl border bg-card/50 space-y-2">
            <h3 className="font-semibold text-lg text-foreground">Connect</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Engage with other developers and content creators across the platform.
            </p>
          </div>
        </div>
      </main>

      {/* 3. Footer Section (تذييل الصفحة احترافي) */}
      <footer className="w-full border-t bg-muted/20 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* حقوق النشر اسم الموقع */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">Next<span className="text-blue-500">PRO</span></span>
            <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          {/* روابط التواصل الاجتماعي مع أيقونات SVG تعمل مباشرة */}
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground font-medium">Contact & Socials:</span>
            <div className="flex items-center gap-2">
              {/* GitHub SVG Icon */}
              <Link 
                href="https://github.com/dragonballalmlkyt-sketch?tab=repositories" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </Link>
              
              {/* LinkedIn SVG Icon */}
              <Link 
                href="https://www.linkedin.com/in/gerges-adel-9b1523377/" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}