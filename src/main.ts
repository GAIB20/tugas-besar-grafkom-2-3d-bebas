// Module related imports

// Stylesheet imports
import "src/css/global.css";
import { setupLoadModel } from "src/ui-element/load-model.ts";
// import "src/css/dummy/dummy.css";

/**
 * Main Script
*/
const loadFile = document.querySelector<HTMLInputElement>("#load-model")!;
setupLoadModel(loadFile);
