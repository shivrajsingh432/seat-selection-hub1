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

export const MovieCard = ({ id, title, posterUrl, languages, rating, genre }: MovieCardProps) => {
  return (
    <Link to={`/movie/${id}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-card transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={posterUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Book Now
          </Button>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-foreground line-clamp-1 mb-2">{title}</h3>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 text-accent">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">{rating}/10</span>
            </div>
            <span className="text-xs text-muted-foreground">{genre}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {languages.map((lang) => (
              <Badge key={lang} variant="secondary" className="text-xs">
                {lang}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
