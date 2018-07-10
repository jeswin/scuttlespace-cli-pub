import pg = require("pg");
import { parseServiceResult } from "scuttlespace-api-common";
import { Response } from "scuttlespace-cli-common/dist";
// import * as authServiceModule from "scuttlespace-service-auth";
import { ICallContext } from "standard-api";
import * as expr from "switch-expr";
import { IHostSettings } from ".";

export default async function post(
  args: any,
  externalId: string,
  messageId: string,
  pool: pg.Pool,
  hostSettings: IHostSettings,
  context: ICallContext
  // pubService: typeof pubServiceModule
) {
  // try {
  //   const accountCreationExpressions = async () =>
  //     await expr.firstAsync([
  //       [
  //         () => typeof args.enable !== "undefined",
  //         async () => {
  //           const { username } = await parseServiceResult(
  //             authService.enableAccount(externalId, pool, context)
  //           );
  //           return new Response(
  //             `The user ${username} has been enabled.`,
  //             messageId
  //           );
  //         }
  //       ],
  //       [
  //         () => typeof args.disable !== "undefined",
  //         async () => {
  //           const { username } = await parseServiceResult(
  //             authService.disableAccount(externalId, pool, context)
  //           );
  //           return new Response(
  //             `The user ${username} has been disabled.`,
  //             messageId
  //           );
  //         }
  //       ],
  //       [
  //         () => typeof args.destroy !== "undefined",
  //         async () => {
  //           try {
  //             const { username } = await parseServiceResult(
  //               authService.destroyAccount(externalId, pool, context)
  //             );
  //             return new Response(
  //               `The user ${username} has been deleted.`,
  //               messageId
  //             );
  //           } catch (ex) {
  //             return new Response(
  //               ex.code === "CANNOT_DELETE_ACTIVE_ACCOUNT"
  //                 ? `As a safety measure, the user needs to be disabled before deleting it. Say 'user disable'.`
  //                 : `Unable to delete the user.`,
  //               messageId
  //             );
  //           }
  //         }
  //       ]
  //     ]);
  //   const accountModExpressions = async () => {
  //     const results = await expr.collectAsync([
  //       [
  //         () => typeof args.about !== "undefined",
  //         async () => {
  //           const { username } = await parseServiceResult(
  //             authService.editAccountAbout(args.about, externalId, pool, context)
  //           );
  //           return "about text";
  //         }
  //       ],
  //       [
  //         () => typeof args.domain !== "undefined",
  //         async () => {
  //           const { username } = await parseServiceResult(
  //             authService.editAccountDomain(
  //               args.domain,
  //               externalId,
  //               pool,
  //               context
  //             )
  //           );
  //           return "domain";
  //         }
  //       ]
  //     ]);
  //     return results.length
  //       ? new Response(`Updated ${results.join(", ")}.`, messageId)
  //       : undefined;
  //   };
  //   return (
  //     (await accountCreationExpressions()) ||
  //     (await accountModExpressions()) ||
  //     new Response(`Sorry, did not follow that instruction.`, messageId)
  //   );
  // } catch (ex) {}
}
