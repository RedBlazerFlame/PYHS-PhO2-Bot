export function parseArgs(args) {
    const result = args
        .split(/( ---|---)/)
        .slice(1)
        .filter((entry) => !["---", " ---"].includes(entry))
        .reduce((acc, cur) => (Object.assign(Object.assign({}, acc), (() => {
        // Splitting the String by Line Breaks and Spaces
        let splitString = cur
            .split("\n")
            .map((entry) => entry.split(" "));
        // Extracting Property Name
        let propertyName = splitString[0][0];
        // Extracting Input (Might need to refactor this because it looks complicated -- all it does is concatenate the splitString disregarding the property name)
        let input = [
            splitString[0].slice(1).join(" "),
            ...splitString.slice(1).map((entry) => entry.join(" ")),
        ].join("\n");
        return { [propertyName]: input };
    })())), {});
    return result;
}
