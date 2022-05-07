import "./sidebar.css";
import SidebarLink from "./SidebarLink";
function Sidebar(){
  return(
    <div className="sidebar">
        <SidebarLink text="Home" />
        <SidebarLink text="Explore" />
        <SidebarLink text="Notifications" />
        <SidebarLink text="Messages" />
        <SidebarLink text="Bookmarks" />
        <SidebarLink text="Lists" />
        <SidebarLink text="Profile" />
        <SidebarLink text="More" />
    </div>
  );
}
export default Sidebar;