import { join, resolve } from "path";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";

export function openFile(folder: string, fileName: string) {
  const pathToFolder = join(resolve(__dirname), `../${folder}`);
  const path = join(pathToFolder, fileName);

  const data = readFileSync(path, "utf8");
  return data;
}

// ✅ write to file SYNCHRONOUSLY
export function replaceToFile(data: any, folder: string, fileName: string) {
  /**
   * flags:
   *  - w = Open file for reading and writing. File is created if not exists
   *  - a+ = Open file for reading and appending. The file is created if not exists
   */

  const pathToFolder = join(resolve(__dirname), `../${folder}`);

  if (!existsSync(pathToFolder)) {
    mkdirSync(pathToFolder, { recursive: true });
  }

  const path = join(pathToFolder, fileName);

  writeFileSync(path, data, {
    flag: "w",
  });
}

export function addToFile(data: any, folder: string, fileName: string) {
  /**
   * flags:
   *  - w = Open file for reading and writing. File is created if not exists
   *  - a+ = Open file for reading and appending. The file is created if not exists
   */
  const pathToFolder = join(resolve(__dirname), `../${folder}`);

  if (!existsSync(pathToFolder)) {
    mkdirSync(pathToFolder, { recursive: true });
  }

  const path = join(pathToFolder, fileName);

  writeFileSync(path, data, {
    flag: "a+",
  });
}
