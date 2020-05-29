import Groups from "~/pages/groups/Groups";
import Login from "~/pages/login/LoginPage";
import CreateGroup from "~/pages/groups/CreateGroup";
import CreatePrompt from "~/pages/prompt/CreatePrompt";
import Group from "~/pages/groups/Group";
import Vote from "~/pages/prompt/PromptVote";
import Respond from "~/pages/prompt/PromptRespond";

const routes = {
  home: Groups,
  group: Group,
  login: Login,
  createGroup: CreateGroup,
  createPrompt: CreatePrompt,
  vote: Vote,
  respond: Respond,
};

export default routes;
