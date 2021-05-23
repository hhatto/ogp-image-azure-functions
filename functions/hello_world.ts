import type { AzureFunctionsContext } from "../deps.ts";
import { Image } from "../deps.ts";
import { encode } from "https://deno.land/std/encoding/base64.ts"

const __filename = new URL(".", import.meta.url).pathname;
const RESOURCE_ROOT = `${__filename}`;

async function handler(context: AzureFunctionsContext) {
  const propertyAddress = context.req?.params.address
  if (propertyAddress === "") {
    return {
      status: 404,
      body: 'Not found',
    }
  }

  const binary = await Deno.readFile(`${RESOURCE_ROOT}/base.png`);
  const font = await Deno.readFile(`${RESOURCE_ROOT}/Roboto-Regular.ttf`);
  const image = await Image.decode(binary);
  console.info(`width=${image.width}, height=${image.height}`);

  const helloText = Image.renderText(font, 120, "hello", 0xffffffff);
  image.composite(helloText, 30, 100);

  const encoded = await image.encode(1);
  console.log(encoded)

  return encode(encoded);
}

export default {
  handler,

  // Name of the function
  name: "hello_world",

  metadata: {
    bindings: [
      {
        type: "httpTrigger",
        authLevel: "anonymous",
        direction: "in",
        name: "req",
        methods: ["GET"],
        route: "hello/{address}",
      },
      {
        type: "http",
        direction: "out",
        name: "$return"
      }
    ],
  },
};
