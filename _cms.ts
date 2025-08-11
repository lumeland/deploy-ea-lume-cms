import lumeCMS from "lume/cms/mod.ts";

const cms = lumeCMS({
  site: {},
});

cms.document({
  name: "homepage",
  store: "src:index.md",
  fields: [
    "title: text",
    "content: markdown",
  ],
});

cms.git();

export default cms;
