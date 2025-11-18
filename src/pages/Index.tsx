import { useState } from "react";
import { MovieCard } from "@/components/MovieCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Film, MapPin } from "lucide-react";

// Mock data - in real app, this would come from API
const mockMovies = [
  {
    id: "1",
    title: "The Grand Adventure",
    posterUrl: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop",
    languages: ["English", "Hindi"],
    rating: 8.5,
    genre: "Action",
  },
  {
    id: "2",
    title: "Mystery at Midnight",
    posterUrl: "https://images.unsplash.com/photo-1574267432644-f610f5ef2bf4?w=400&h=600&fit=crop",
    languages: ["English"],
    rating: 7.8,
    genre: "Thriller",
  },
  {
    id: "3",
    title: "Love in Paris",
    posterUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=600&fit=crop",
    languages: ["English", "French"],
    rating: 8.2,
    genre: "Romance",
  },
  {
    id: "4",
    title: "Cosmic Warriors",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    languages: ["English", "Tamil"],
    rating: 9.0,
    genre: "Sci-Fi",
  },
  {
    id: "5",
    title: "The Last Stand",
    posterUrl: "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?w=400&h=600&fit=crop",
    languages: ["Hindi", "Telugu"],
    rating: 8.7,
    genre: "Action",
  },
  {
    id: "6",
    title: "Comedy Nights",
    posterUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&h=600&fit=crop",
    languages: ["English"],
    rating: 7.5,
    genre: "Comedy",
  },
];

const genres = ["All", "Action", "Romance", "Thriller", "Sci-Fi", "Comedy"];
const languages = ["All", "English", "Hindi", "Tamil", "Telugu", "French"];

export default function Index() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = mockMovies.filter((movie) => {
    const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
    const matchesLanguage =
      selectedLanguage === "All" || movie.languages.includes(selectedLanguage);
    const matchesSearch =
      searchQuery === "" || movie.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesGenre && matchesLanguage && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1920&h=1080&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12 md:pb-16">
          <div className="max-w-2xl space-y-4">
            <Badge className="bg-primary text-primary-foreground mb-2">Now Playing</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              The Grand Adventure
            </h1>
            <p className="text-lg text-muted-foreground">
              Experience the thrill of cinema like never before. Book your tickets now!
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Film className="mr-2 h-5 w-5" />
              Book Now
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>

          {/* Filters */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Film className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Genre:</span>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant={selectedGenre === genre ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Language:</span>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <Badge
                    key={lang}
                    variant={selectedLanguage === lang ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedLanguage(lang)}
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Now Showing</h2>
        
        {filteredMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No movies found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
