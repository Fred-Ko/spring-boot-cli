import * as fs from "fs";
import * as path from "path";

export const isDirectoryExist = (dir: string): boolean => fs.existsSync(dir);

export const makeDirectory = (dir: string): void => {
  fs.mkdirSync(dir, { recursive: true });
};

export const createDirectory = (dir: string): void => {
  if (!isDirectoryExist(dir)) makeDirectory(dir);
};

export const writeFile = (filePath: string, content: string): void =>
  fs.writeFileSync(filePath, content);

export const createFile = (filePath: string, content: string = ""): void =>
  writeFile(filePath, content);

export const getModuleName = (structure: Record<string, unknown>): string =>
  Object.keys(structure)[0];

export const getModuleDir = (baseDir: string, moduleName: string): string =>
  path.join(baseDir, moduleName);

export const getLayerDir = (moduleDir: string, layer: string): string =>
  path.join(moduleDir, layer);

export const getSubLayerDir = (layerDir: string, subLayer: string): string =>
  path.join(layerDir, subLayer);

export const getItemTypeDir = (subLayerDir: string, itemType: string): string =>
  path.join(subLayerDir, itemType);

export const getFilePath = (dir: string, item: string): string =>
  path.join(dir, `${item}.java`);