import humanist from "humanist";
import pg = require("pg");
import { Response } from "scuttlespace-cli-common";
import * as authServiceModule from "scuttlespace-service-auth";
import { ICallContext } from "standard-api";
import createOrRename from "./create-or-rename";
import modify from "./modify";
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

  pub delete some-message-id
  pub delete <slug>

  power
  
  pub index order date

  pub index 
*/

let authService: typeof authServiceModule = authServiceModule;

export function inject(mods: { auth: typeof authServiceModule }) {
  authService = mods.auth;
}

const parser = humanist([
  ["id", "single"],
  ["about", "multi", { join: true }],
  ["domain", "single"],
  ["link", "single"],
  ["delink", "single"],
  ["enable", "flag"],
  ["disable", "flag"],
  ["destroy", "flag"]
]);

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

  return lcaseCommand.startsWith("user ")
    ? await (async () => {
        const args: any = parser(command);
        try {
          const resp = args.id
            ? await createOrRename(
                args.id,
                sender,
                messageId,
                pool,
                hostSettings,
                context,
                authService
              )
            : await modify(
                args,
                sender,
                messageId,
                pool,
                hostSettings,
                context,
                authService
              );
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
