// Module related imports
import { setupCounter } from "src/composables/counter";

// Stylesheet imports
import "src/css/global.css";
import "src/css/dummy/dummy.css";

/**
 * Main Script
*/
setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
