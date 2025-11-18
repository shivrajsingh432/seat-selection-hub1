import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star, Clock, Calendar, MapPin } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

// Mock data - in real app, this would come from API
const mockMovie = {
  id: "1",
  title: "The Grand Adventure",
  posterUrl: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop",
  rating: 8.5,
  duration: "2h 30m",
  languages: ["English", "Hindi", "Tamil"],
  genre: "Action, Adventure",
  synopsis: "An epic tale of courage and discovery as our heroes embark on a journey to save their world from an ancient evil. Packed with stunning visuals and heart-pounding action.",
  cast: ["John Doe", "Jane Smith", "Robert Johnson"],
  showtimes: [
    { id: "1", cinema: "PVR Cinemas", location: "Inox Mall", times: ["10:30 AM", "2:00 PM", "6:30 PM", "9:45 PM"] },
    { id: "2", cinema: "Cinépolis", location: "Phoenix Mall", times: ["11:00 AM", "3:30 PM", "7:00 PM", "10:15 PM"] },
  ],
};

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleShowtimeSelect = (showtimeId: string) => {
    navigate(`/showtime/${showtimeId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={mockMovie.posterUrl}
            alt={mockMovie.title}
            className="w-full h-full object-cover blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <img
              src={mockMovie.posterUrl}
              alt={mockMovie.title}
              className="w-40 md:w-56 rounded-lg shadow-2xl"
            />
            
            <div className="flex flex-col justify-end space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground">{mockMovie.title}</h1>
              
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-1 text-accent">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="text-lg font-semibold">{mockMovie.rating}/10</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{mockMovie.duration}</span>
                </div>
                <Badge variant="secondary">{mockMovie.genre}</Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                {mockMovie.languages.map((lang) => (
                  <Badge key={lang} variant="outline">{lang}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Synopsis */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">About the Movie</h2>
          <p className="text-muted-foreground leading-relaxed">{mockMovie.synopsis}</p>
        </section>

        {/* Cast */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Cast</h2>
          <div className="flex flex-wrap gap-2">
            {mockMovie.cast.map((actor) => (
              <Badge key={actor} variant="secondary" className="text-sm py-2 px-4">
                {actor}
              </Badge>
            ))}
          </div>
        </section>

        {/* Showtimes */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Select Showtime</h2>
          </div>

          <div className="grid gap-4">
            {mockMovie.showtimes.map((showtime) => (
              <Card key={showtime.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {showtime.cinema}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{showtime.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {showtime.times.map((time) => (
                      <Button
                        key={time}
                        variant="outline"
                        onClick={() => handleShowtimeSelect(showtime.id)}
                        className="hover:bg-primary hover:text-primary-foreground hover:border-primary"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
