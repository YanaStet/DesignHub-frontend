import logo from "@/shared/assets/logo.png";
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
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { useMe } from "@/shared/store/meStore";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { Link } from "react-router-dom";

export function Header() {
  const { me } = useMe();

  return (
    <div className="w-full h-16 bg-primary-1 flex items-center justify-between px-15">
      <Link to={ROUTE_PATHS.HOME} className="w-13">
        <img src={logo} alt="Logo" className="object-cover" />
      </Link>
      <div>
        <Typography variant="h4" className="text-white">
          Navigation
        </Typography>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="#" alt="@shadcn" />
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
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
