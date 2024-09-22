import * as fileUtils from "./fileUtils";
import { ModuleStructure } from "./types";

const createJavaFile = (dir: string, item: string): void =>
  fileUtils.createFile(
    fileUtils.getFilePath(dir, item),
    `
    
class ${item} {
    // TODO: Implement ${item}
}
    `
  );

const processItemList = (dir: string, itemList: string[]): void =>
  itemList.forEach((item) => createJavaFile(dir, item));

const processItemType = (
  subLayerDir: string,
  itemType: string,
  itemList: string[]
): void => {
  const itemTypeDir = fileUtils.getItemTypeDir(subLayerDir, itemType);
  fileUtils.createDirectory(itemTypeDir);
  processItemList(itemTypeDir, itemList);
};

const processSubLayer = (
  layerDir: string,
  subLayer: string,
  content: Record<string, unknown>
): void => {
  const subLayerDir = fileUtils.getSubLayerDir(layerDir, subLayer);
  fileUtils.createDirectory(subLayerDir);
  Object.entries(content).forEach(([itemType, items]) => {
    if (Array.isArray(items)) processItemList(subLayerDir, items);
    else if (typeof items === "object" && items !== null)
      processItemType(subLayerDir, itemType, items as string[]);
  });
};

const processLayer = (
  moduleDir: string,
  layer: string,
  content: Record<string, unknown>
): void => {
  const layerDir = fileUtils.getLayerDir(moduleDir, layer);
  fileUtils.createDirectory(layerDir);
  Object.entries(content).forEach(([subLayer, subContent]) => {
    if (Array.isArray(subContent)) {
      // 직접적인 배열 처리 (예: domain의 repository)
      processItemList(layerDir, subContent);
    } else if (typeof subContent === "object" && subContent !== null) {
      processSubLayer(
        layerDir,
        subLayer,
        subContent as Record<string, unknown>
      );
    }
  });
};

export const generateModuleStructure = (
  baseDir: string,
  structure: ModuleStructure
): void => {
  const moduleName = fileUtils.getModuleName(structure);
  const moduleDir = fileUtils.getModuleDir(baseDir, moduleName);
  fileUtils.createDirectory(moduleDir);
  Object.entries(structure[moduleName]).forEach(([layer, content]) =>
    processLayer(moduleDir, layer, content as Record<string, unknown>)
  );
};
