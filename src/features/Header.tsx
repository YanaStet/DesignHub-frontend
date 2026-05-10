import { authService } from "@/entities/auth/api/service";
import logo from "@/shared/assets/logo.png";
import { useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/shadcn-ui/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/shadcn-ui/ui/dropdown-menu";
import { useMe } from "@/shared/store/meStore";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const { me, avatar_url, setMe, setAvatarUrl, setDesignerProfile } = useMe();
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const handleLogOut = async () => {
    await authService.logout();
    setMe(null);
    setAvatarUrl(undefined);
    setDesignerProfile(null);
    queryClient.clear();
    navigate(ROUTE_PATHS.LOGIN);
  };

  return (
    <div className="w-full h-16 bg-primary-1 flex items-center justify-between px-15">
      <Link to={ROUTE_PATHS.HOME} className="w-13">
        <img src={logo} alt="Logo" className="object-cover" />
      </Link>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage
                src={avatar_url}
                alt="@shadcn"
                className="object-cover"
              />
              <AvatarFallback>
                {me?.firstName[0]}
                {me?.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-primary-1 text-gray-4"
            align="center"
          >
            <DropdownMenuItem onClick={() => navigate(ROUTE_PATHS.PROFILE)}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogOut}>Log Out</DropdownMenuItem>
            {me?.role !== 'user' && <DropdownMenuItem onClick={() => navigate(ROUTE_PATHS.ADMIN)}>Admin page</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
