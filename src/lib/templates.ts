// let tokenData = {"tokenId":"78000886","hash":"0xbf5c684d4bc501b3e8103c42f1fe03a580c3f7b3a588d87741581e3858e10de6"}

export enum Template {
  Fidenza = "fidenza",
}

const EXAMPLE_TOKEN_ID = {
  [Template.Fidenza]: "78000000",
};

const getGeneratorURL = (id: string) => `https://generator.artblocks.io/${id}`;

const REGEX =
  /(let tokenData = {"tokenId":")(\d+)(","hash":")(0x[a-zA-Z0-9]+)("})/gi;

export async function loadTemplateWithTokenHash(
  template: Template,
  tokenId: string,
  tokenHash: string
) {
  const response = await fetch(getGeneratorURL(EXAMPLE_TOKEN_ID[template]));
  const content = await response.text();

  return content.replace(REGEX, `$1${tokenId}$3${tokenHash}$5`);
}
