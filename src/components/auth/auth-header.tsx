import { SchoolRounded } from "@mui/icons-material";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export default function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-4">
      <div className="flex items-center justify-center bg-primary rounded-2xl p-2">
        <SchoolRounded sx={{ color: "white", fontSize: 32 }} />
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
