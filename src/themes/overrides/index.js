// third-party
import { merge } from "lodash";

// project import
import Badge from "./Badge";
import Button from "./Button";
import CardContent from "./CardContent";
import Checkbox from "./Checkbox";
import Chip from "./Chip";
import Divider from "./Divider";
import IconButton from "./IconButton";
import InputLabel from "./InputLabel";
import LinearProgress from "./LinearProgress";
import Link from "./Link";
import ListItemIcon from "./ListItemIcon";
import Modal from "./Modal";
import OutlinedInput from "./OutlinedInput";
import Select from "./Select";
import Skeleton from "./Skeleton";
import Tab from "./Tab";
import TableCell from "./TableCell";
import Tabs from "./Tabs";
import TextField from "./TextField";
import Typography from "./Typography";

// ==============================|| OVERRIDES - MAIN ||============================== //

export default function ComponentsOverrides(theme) {
  return merge(
    Button(theme),
    Badge(theme),
    CardContent(),
    Checkbox(theme),
    Chip(theme),
    IconButton(theme),
    InputLabel(theme),
    LinearProgress(),
    Link(),
    ListItemIcon(),
    OutlinedInput(theme),
    Tab(theme),
    TableCell(theme),
    Tabs(theme),
    Typography(theme),
    TextField(theme),
    Select(),
    Modal(theme),
    Divider(theme),
    Skeleton(theme)
  );
}
