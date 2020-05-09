import Groups from "~/pages/groups/Groups";
import Login from "~/pages/login/LoginPage";
import CreateGroup from "~/pages/groups/CreateGroup";
import Group from "~/pages/groups/Group";
import Vote from "~/pages/prompt/PromptVote";
import Respond from "~/pages/prompt/PromptRespond";

const routes = {
  home: Groups,
  // Make dynamic
  group: Group,
  login: Login,
  createGroup: CreateGroup,
  vote: Vote,
  respond: Respond,
};

export default routes;
