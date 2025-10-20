import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Achievement } from "@/types/home";

export function AchievementCard({ title, description, Icon }: Achievement) {
  return (
    <Card className="transition-all duration-300 cursor-pointer hover:shadow-blue-400/20 hover:border-blue-400/50 hover:scale-105">
      <CardHeader className="flex flex-row items-center gap-4">
        <Icon className="w-8 h-8 text-primary" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
