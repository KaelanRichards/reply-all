import Groups from "../pages/groups/Groups";
import Login from "../pages/login/LoginPage";
import CreateGroup from "../pages/groups/CreateGroup";
import Group from "../pages/groups/Group";

const routes = {
  home: Groups,
  // Make dynamic
  group: Group,
  login: Login,
  createGroup: CreateGroup,
};

export default routes;
