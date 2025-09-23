import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export default function UserProfile() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-9 w-9 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />;
  }

  if (!user) {
    return null;
  }

  const initials = (user as any)?.firstName && (user as any)?.lastName 
    ? `${(user as any).firstName.charAt(0)}${(user as any).lastName.charAt(0)}`
    : (user as any)?.email?.charAt(0)?.toUpperCase() || 'U';

  const displayName = (user as any)?.firstName && (user as any)?.lastName 
    ? `${(user as any).firstName} ${(user as any).lastName}`
    : (user as any)?.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-9 w-9 rounded-full" 
          data-testid="button-user-profile"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={(user as any)?.profileImageUrl} alt={displayName} />
            <AvatarFallback className="text-sm">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {displayName && (
              <p className="font-medium leading-none" data-testid="text-user-name">
                {displayName}
              </p>
            )}
            {(user as any)?.email && (
              <p className="text-xs leading-none text-muted-foreground" data-testid="text-user-email">
                {(user as any).email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a 
            href="/api/logout"
            className="cursor-pointer"
            data-testid="button-logout"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}