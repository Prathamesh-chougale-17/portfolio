import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Project } from "@/components/project/project-card";

interface ProjectFiltersProps {
  projects: Project[];
  onFilteredProjectsChange: (filteredProjects: Project[]) => void;
}

export function ProjectFilters({
  projects,
  onFilteredProjectsChange,
}: ProjectFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Get all tags directly (no useMemo)
  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags))
  ).sort();

  // Call filter each time something changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    handleFilterAfterChange(value, selectedTag, showFeaturedOnly);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    handleFilterAfterChange(searchQuery, tag, showFeaturedOnly);
  };

  const handleFeaturedChange = (checked: boolean) => {
    setShowFeaturedOnly(checked);
    handleFilterAfterChange(searchQuery, selectedTag, checked);
  };

  const handleFilterAfterChange = (
    query: string,
    tag: string,
    featured: boolean
  ) => {
    const filtered = projects.filter((project) => {
      const search = query.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search) ||
        project.tags.some((t) => t.toLowerCase().includes(search));

      const matchesTag = tag === "all" || project.tags.includes(tag);
      const matchesFeatured = !featured || project.featured;

      return matchesSearch && matchesTag && matchesFeatured;
    });

    onFilteredProjectsChange(filtered);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag("all");
    setShowFeaturedOnly(false);
    onFilteredProjectsChange(projects);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between mb-8">
      <div className="flex-1">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>

      <div className="flex flex-row flex-wrap gap-4 items-center">
        {/* Tag Filter */}
        <div className="flex items-center gap-2">
          <Select value={selectedTag} onValueChange={handleTagChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured Filter */}
        <div className="items-center hidden md:flex space-x-2">
          <Checkbox
            id="featured"
            checked={showFeaturedOnly}
            onCheckedChange={(checked) =>
              handleFeaturedChange(checked as boolean)
            }
          />
          <label
            htmlFor="featured"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Featured only
          </label>
        </div>

        {/* Clear Filters */}
        <Button variant="outline" size="sm" onClick={clearFilters}>
          Clear filters
        </Button>
      </div>
    </div>
  );
}
