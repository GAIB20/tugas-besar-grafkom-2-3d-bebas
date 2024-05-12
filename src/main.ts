// Module related imports

// Stylesheet imports
import "src/css/global.css";
import { setupLoadModel } from "src/ui-element/load-model.ts";

/**
 * Main Script
*/
const main = () => {
  const loadFile = document.querySelector<HTMLInputElement>("#load-model")!;
  setupLoadModel(loadFile);
}

main()
