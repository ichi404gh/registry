import { OpenAPI3Schema, Provider } from "../provider";
import * as github from "../github";

export class StripeProvider implements Provider {
  async getVersions(): Promise<string[]> {
    const tags: string[] = [];
    for await (const tag of github.getTags("stripe", "openapi")) {
      tags.push(tag.name);
    }
    return tags.slice(0, 1);
  }

  async getSchema(version: string): Promise<OpenAPI3Schema> {
    const definition = await github.getRaw(
      "stripe",
      "openapi",
      version,
      "openapi/spec3.json"
    );
    return {
      type: "openapi-v3",
      versionName: version,
      value: definition,
    };
  }
}
