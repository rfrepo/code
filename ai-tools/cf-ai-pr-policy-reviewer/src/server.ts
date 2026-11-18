import { routeAgentRequest } from "agents";

// Wrangler binds the Durable Object and the Workflow to classes exported by the entry module,
// so these two exports are required here (wrangler.jsonc: class_name).
export { ChatAgent } from "agent/ChatAgent";
export { ReviewWorkflow } from "features/reviews/workflow/ReviewWorkflow";

const NOT_FOUND = 404;

export default {
  async fetch(request: Request, env: Env) {
    return (
      (await routeAgentRequest(request, env)) ||
      new Response("Not found", { status: NOT_FOUND })
    );
  }
} satisfies ExportedHandler<Env>;
