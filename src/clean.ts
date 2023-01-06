// Prettier offers a clean way to define ignored properties.
const ignoredProperties = new Set(['loc', 'range', 'comments']);

// eslint-disable-next-line @typescript-eslint/no-empty-function
function clean(/* ast, newObj, parent */) {}
clean.ignoredProperties = ignoredProperties;

module.exports = { massageAstNode: clean };
