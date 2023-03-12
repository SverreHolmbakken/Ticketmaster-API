import fetchAPI from "./modules/fetchAPI.js";
import takeScreenshot from "./modules/takeScreenshot.js";

await fetchAPI();
window.onload = function() {
	setInterval(takeScreenshot, 1000);
};