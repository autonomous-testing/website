// static/agent-setup/*.md is imported as its text (webpack asset/source, docusaurus.config.js).
declare module "@site/static/agent-setup/*.md" {
  const content: string;
  export default content;
}
