import { glTF } from "src/types/glTF.ts";

export class glTFUtil {
  public static serialize(glTFObj: glTF): string {
    return JSON.stringify(glTFObj);
  }

  public static deserialize(json: string): glTF {
    return JSON.parse(json);
  }
}
