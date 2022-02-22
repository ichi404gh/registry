import OpenAPIParser from "@readme/openapi-parser";
import { OpenAPIV3 } from "openapi-types";
import { openAPIUrlProvider } from "../provider";

export default openAPIUrlProvider({
  v1: {
    url: "https://docs.ramp.com/openapi/v1/ramp-developer.json",
    transform: async (definition) => {
      const document = (await OpenAPIParser.dereference(definition as any, {
        dereference: { circular: "ignore" },
      })) as OpenAPIV3.Document;

      return {
        ...document,
        components: {
          ...document.components,
          schemas: (document as any).components.models,
        },
      };
    },
  },
});