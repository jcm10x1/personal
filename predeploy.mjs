import { readFile, writeFileSync } from "node:fs";
readFile(".output/server/index.mjs", "utf-8", (errRead, contents) => {
	if (errRead) {
		return console.error(errRead);
	}
	const updated = contents.replace(
		/{ ([A-Za-z]) as server }/gi,
		`{ $1 as jacobmillerServer }`
	);

	writeFileSync(".output/server/index.mjs", updated, "utf-8");
	console.log("Renaming done");
});
