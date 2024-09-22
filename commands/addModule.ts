import { Command } from "commander";
import * as fs from "fs";
import * as yaml from "js-yaml";
import { generateModuleStructure } from "./moduleGenerator";
import { moduleSchema } from "./schema";
import { ModuleStructure } from "./types";

const program = new Command();

const readYamlFile = (yamlFile: string): ModuleStructure =>
  yaml.load(fs.readFileSync(yamlFile, "utf8")) as ModuleStructure;

const validateModuleStructure = (data: ModuleStructure): ModuleStructure => {
  const { error, value } = moduleSchema.validate(data);

  if (error) throw new Error(`유효성 검사 오류: ${error.details[0].message}`);
  return value;
};

const addModule = (yamlFile: string, options: { directory: string }): void => {
  const data = readYamlFile(yamlFile);
  const validatedData = validateModuleStructure(data);
  generateModuleStructure(options.directory, validatedData);
};

program
  .name("add-module")
  .description(
    "YAML 파일을 기반으로 프로젝트에 새로운 Spring Boot 모듈을 추가합니다. " +
      "이 명령어는 지정된 YAML 파일에서 모듈 구조를 읽어와 새로운 Spring Boot 모듈을 생성합니다."
  )
  .argument(
    "<yaml-file>",
    "모듈 구조가 정의된 YAML 파일의 경로. 이 파일에는 생성할 모듈의 상세 구조가 정의되어 있어야 합니다."
  )
  .option(
    "-d, --directory <directory>",
    "모듈 생성을 위한 기본 디렉토리. 생성된 모듈 파일들이 이 디렉토리 아래에 위치하게 됩니다.",
    "./src/main/java"
  )
  .action((yamlFile: string, options: { directory: string }) => {
    try {
      addModule(yamlFile, options);
      console.log(
        "모듈 생성이 성공적으로 완료되었습니다. 생성된 파일들을 확인해 주세요."
      );
    } catch (e) {
      console.error("모듈 생성 중 오류가 발생했습니다:", (e as Error).message);
      console.error("오류를 해결하고 다시 시도해 주세요.");
      process.exit(1);
    }
  });

program.parse(process.argv);
