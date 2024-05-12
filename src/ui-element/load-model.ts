import { glTF } from "src/types/glTF.ts";
import { glTFUtil } from "src/utils/gltf-util.ts";

export const setupLoadModel = (element: HTMLInputElement) =>  {

  element.innerHTML = 'Load';

  element.onchange = () => {
    let file: File | null | undefined = null;
    try {
      if (element.files) {
        file = element.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (ev) => {
          if (ev.target != null) {
            // console.log(ev.target.result);
            // console.log(typeof ev.target.result);
            const _glTF : glTF = glTFUtil.deserialize(ev.target.result as string);
            console.log(_glTF)
            // TODO: add callback to interact with the loaded model
          }
        };
        fileReader.readAsText(file);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
