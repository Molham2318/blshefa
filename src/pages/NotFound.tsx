import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Tell search engines this URL doesn't exist. EZsite's crawler prerender reads
  // `prerender-status-code` and answers 404 instead of 200 (otherwise every broken
  // link becomes an indexable duplicate page — a "soft 404" in Search Console).
  useEffect(() => {
    const tags = [
      { name: "prerender-status-code", content: "404" },
      { name: "robots", content: "noindex" },
    ].map(({ name, content }) => {
      const meta = document.createElement("meta");
      meta.name = name;
      meta.content = content;
      document.head.appendChild(meta);
      return meta;
    });
    return () => tags.forEach((meta) => meta.remove());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {/* Static on purpose: this page is imported by every app, so an animation library here
          ends up in every site's first-load bundle (motion was ~39 KB gzip of the template's JS). */}
      <div className="text-center space-y-6 p-8">
        <h1 className="text-8xl font-bold text-primary">404</h1>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Page Not Found</h2>
          <p className="text-muted-foreground">
            Sorry, the page you are looking for does not exist or has been removed.
          </p>
        </div>

        <Button asChild variant="default" size="lg">
          <a href="/">Back to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
