import lumeCms from "lume/plugins/lume_cms.ts";
import reload from "lume/middlewares/reload.ts";
import noCache from "lume/middlewares/no_cache.ts";
import noCors from "lume/middlewares/no_cors.ts";
import { SiteWatcher } from "lume/core/watcher.ts";
import cms from "./_cms.ts";
import site from "./_config.ts";

site.options.location = new URL("https://deploy-ea-lume-cms.oscarotero.deno.net");

site.use(lumeCms({ cms }));

await site.build();

const server = site.getServer();
const watcher = site.getWatcher();

watcher.addEventListener("change", async (event) => {
  await site.update(event.files!);
});

server.use(
  reload({
    watcher: new SiteWatcher(site),
    basepath: site.options.location.pathname,
    debugBar: site.debugBar,
  }),
  noCache(),
  noCors(),
);

server.options.port = 8000;
server.start();
