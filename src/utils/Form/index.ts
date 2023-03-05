import FilePreview from "./FilePreview";

const readFileAsText = async (inputFile: File) => {
  const utf8Decoder = new TextDecoder("utf-8", { fatal: true });
  const sjisDecoder = new TextDecoder("sjis", { fatal: true });
  const buffer = await inputFile.arrayBuffer();
  let content: string;
  try {
    content = utf8Decoder.decode(buffer);
  } catch {
    try {
      content = sjisDecoder.decode(buffer);
    } catch (e: unknown) {
      if (e instanceof TypeError) throw e;
      throw new Error("予期せぬエラーが発生しました。");
    }
  }
  return content;
};

export * from "./Form";
export * from "./InputField";
export * from "./SelectField";
export * from "./TextAreaField";
export { FilePreview, readFileAsText };
