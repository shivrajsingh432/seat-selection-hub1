import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  id: string;
  title: string;
  posterUrl: string;
  languages: string[];
  rating: number;
  genre: string;
}

export const MovieCard = ({
  id,
  title,
  posterUrl,
  languages,
  rating,
  genre,
}: MovieCardProps) => {
  return (
    <Link to={`/movie/${id}`} className="group [perspective:900px]">
      <div
        className={`
          relative overflow-hidden rounded-xl bg-card transition-all duration-500
          group-hover:scale-[1.04] will-change-transform
        `}
      >
        {/* Neon glow overlay (absolute element so we can animate box-shadow-like glow) */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute -inset-0.5 rounded-xl opacity-0 transition-opacity duration-400
            group-hover:opacity-100
          "
          // inline style used to produce colorful neon multi-layer glows
          style={{
            boxShadow:
              "0 6px 22px rgba(99,102,241,0.12), /* soft base */\n" +
              "0 0 18px rgba(99,102,241,0.25), /* violet */\n" +
              "0 0 36px rgba(14,165,233,0.18), /* cyan */\n" +
              "inset 0 0 28px rgba(99,102,241,0.06)",
            // Slightly push the overlay outward for a halo effect
            transform: "translateZ(0)",
            // create a subtle gradient tint using background blend
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(14,165,233,0.04))",
          }}
        />

        {/* Poster container */}
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={posterUrl}
            alt={title}
            className="
              h-full w-full object-cover transition-transform duration-700
              group-hover:scale-110 group-hover:blur-sm will-change-transform
            "
          />

          {/* soft colored edge glow for the image specifically */}
          <div
            aria-hidden
            className="
              absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-60
              backdrop-blur-sm
            "
            style={{
              background:
                "linear-gradient(180deg, rgba(14,165,233,0.06), rgba(99,102,241,0.04))",
              mixBlendMode: "screen",
            }}
          />
        </div>

        {/* Floating Book Now button */}
        <div className="absolute bottom-4 left-4 right-4 px-4 translate-y-10 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
            Book Now
          </Button>
        </div>

        {/* Info */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-1 text-lg">{title}</h3>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">{rating}/10</span>
            </div>

            <span className="text-xs px-2 py-[2px] rounded-full bg-muted text-muted-foreground">
              {genre}
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {languages.map((lang) => (
              <Badge
                key={lang}
                variant="secondary"
                className="text-[10px] px-2 py-[2px] group-hover:scale-105 transition-transform duration-300"
              >
                {lang}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
