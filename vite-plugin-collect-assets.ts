import { Plugin } from "vite";
import fs from "fs";

const collectAssetsPlugin: () => Plugin = () => {
  let assets: string[] = [];

  return {
    name: "collect-assets",

    generateBundle(_, bundle) {
      for (const fileName in bundle) {
        assets.push("/" + fileName);
      }
    },

    writeBundle() {
      const swConstantsFileName = "dist/sw-constants.js";
      const swConstants = fs.readFileSync(swConstantsFileName, "utf-8");
      fs.writeFileSync(
        swConstantsFileName,
        swConstants.replace("// __VITE_ASSETS__", JSON.stringify(assets).slice(1, -1))
      );
    },
  };
};

export default collectAssetsPlugin;