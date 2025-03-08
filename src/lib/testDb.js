import dbConnect from "./dbConnect.js";

(async () => {
    await dbConnect();
    process.exit();
})();
