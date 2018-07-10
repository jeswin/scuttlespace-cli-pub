import humanist from "humanist";
import pg = require("pg");
import { Response } from "scuttlespace-cli-common/dist";
// import * as pubServiceModule from "scuttlespace-service-pub";
import { ICallContext } from "standard-api";
import post from "./post";

/*
  Supported commands
  
  Posts
  ------------------
  # Post first message in thread
  pub post

  # Post by message id
  pub post some-message-id

  # With comments
  pub post some-message-id comments

  # And summary
  pub post some-message-id comments summary It was a dark and stormy night; the rain fell in torrents.

  # Post to a category
  pub post some-message-id category travel

  # Post with a slug
  pub post some-message-id slug gullivers-travels

  # Delete the post on the same thread
  pub delete

  # Delete a post by message id
  pub delete some-message-id

  # Delete a post by slug
  pub delete <slug>
*/

// let pubService: typeof pubServiceModule = pubServiceModule;

// export function inject(mods: { auth: typeof pubServiceModule }) {
//   pubService = mods.auth;
// }

const parser = humanist([["post", "flag"], ["post", "single"]]);

export interface IHostSettings {
  hostname: string;
}

export default async function handle(
  command: string,
  messageId: string,
  sender: string,
  pool: pg.Pool,
  hostSettings: IHostSettings,
  context: ICallContext
) {
  const lcaseCommand = command.toLowerCase();

  return lcaseCommand.startsWith("pub ")
    ? await (async () => {
        const args: any = parser(command);
        try {
          const resp =
            typeof args.post !== "undefined" ? await post : undefined;
          return resp;
        } catch (ex) {
          return new Response(
            `Sorry that did not work, looks like an error at our end. We'll fix it.`,
            messageId
          );
        }
      })()
    : undefined;
}
