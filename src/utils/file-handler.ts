import { useFactory } from "src/composables/useFactory";
import { Node } from "src/core/node-v2";
import { INode } from "src/types/deserializer";

const { factory } = useFactory();

export const readFile = async (path: string) => {
  const res = await fetch(path);
  const content = await res.text();
  return content;
};

export const exportModelJSON = (node: Node) => {
  const data = JSON.stringify(node.toJSON());
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const download = document.createElement("a");
  download.href = url;
  download.download = "output_model.json";
  download.click();
};

export const importModelJSON = (file: File): Promise<Node> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data: INode = JSON.parse(e.target?.result as string);
        resolve(factory(data));
      } catch (error) {
        console.error(error);
        reject(error);
      }
    };

    reader.readAsText(file);
  });
};
