import { EntitySchema, OpenAPI3Schema, OpenAPIProvider } from "../provider";
import _ from "lodash";
import axios from "axios";
import openAPIParser from "@readme/openapi-parser";

export class ShipbobProvider implements OpenAPIProvider {
  isEnabled(): boolean {
    return true;
  }

  async getVersions(): Promise<string[]> {
    return ["1.0"];
  }

  async getSchema(version: string): Promise<OpenAPI3Schema> {
    const definition = await axios.get(
      "https://developer.shipbob.com/5ef1ccd8-c4b5-4d72-b11e-f46122c63594"
    );

    return {
      type: "openapi-v3",
      versionName: version,
      value: definition.data,
      // entities: [
      //   "person",
      //   "metric",
      //   "template",
      //   "campaign",
      //   "identify_payload",
      //   "check_membership_request",
      //   "check_membership_response",
      // ],
    };
  }

  async unbundle(bundle: OpenAPI3Schema): Promise<EntitySchema[]> {
    const dereferenced = await openAPIParser.dereference(bundle.value as any);

    const hasComponents = "components" in dereferenced;
    if (!hasComponents) throw new Error("Expected components");

    return Object.entries(dereferenced.components?.schemas ?? {})
      .filter(([key]) => !bundle.entities || bundle.entities.includes(key))
      .map(([key, value]) => ({
        name: key,
        schema: sanitizeSchema(value),
      }));
  }
}

function sanitizeSchema(schema: unknown) {
  return JSON.parse(
    JSON.stringify(schema, (key, value) => {
      return value;
    })
  );
}
