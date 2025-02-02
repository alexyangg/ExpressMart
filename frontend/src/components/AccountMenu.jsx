import React, { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  MdAccountCircle,
  MdOutlineAccountCircle,
  MdHistory,
} from "react-icons/md";
import {
  IoCartOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

const AccountMenu = () => {
  //   const { isAuthenticated } = useAuthStore();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/logout");
    setTimeout(() => {
      logout();
    }, 1000);
  };

  //   useEffect(() => {
  //     if (isAuthenticated) {
  //       navigate("/logout");
  //       logout();
  //     }
  //   }, [isAuthenticated, navigate]);

  return (
    <MenuRoot lazyMount={true}>
      <MenuTrigger asChild>
        <Button>
          <MdAccountCircle size={40} />
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="account" onClick={() => navigate("/profile")}>
          <MdOutlineAccountCircle />
          Profile
        </MenuItem>
        <MenuItem value="cart" onClick={() => navigate("/cart")}>
          <IoCartOutline />
          Cart
        </MenuItem>
        <MenuItem
          value="order-history"
          onClick={() => navigate("/order-history")}
        >
          <MdHistory />
          Order History
        </MenuItem>
        <MenuItem value="settings" onClick={() => navigate("/settings")}>
          <IoSettingsOutline />
          Account Settings
        </MenuItem>
        <MenuItem
          value="logout"
          color="fg.error"
          _hover={{ bg: "bg.error", color: "fg.error" }}
          onClick={handleLogout}
        >
          <IoLogOutOutline />
          Logout
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default AccountMenu;
