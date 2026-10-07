import { FaPaintBrush, FaCube, FaFilm, FaCut, FaBroadcastTower, FaBullhorn, FaCode } from "react-icons/fa";
import { GiSkeleton } from "react-icons/gi";

const ICONS = {
  illustration: FaPaintBrush,
  modeling: FaCube,
  rigging: GiSkeleton,
  animation: FaFilm,
  editing: FaCut,
  broadcasting: FaBroadcastTower,
  branding: FaBullhorn,
  software: FaCode,
};

const DivisionIcon = ({ icon, className = "", style }) => {
  const Icon = ICONS[icon] ?? FaPaintBrush;
  return <Icon className={className} style={style} />;
};

export default DivisionIcon;
