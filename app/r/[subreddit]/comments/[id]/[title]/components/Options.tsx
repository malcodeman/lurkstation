import { saveAs } from "file-saver";
import { FiDownload, FiMaximize } from "react-icons/fi";

type Props = {
  url: string;
  filename: string;
};

export function Options(props: Props) {
  const { url, filename } = props;

  const handleOnDownload = () => {
    saveAs(url, filename);
  };

  const handleOnMaximize = () => {
    window.open(url, "_blank")?.focus();
  };

  return (
    <div className="absolute bottom-2 left-[50%] flex translate-x-[-50%] rounded bg-white/50 p-2 backdrop-contrast-100 transition-opacity group-hover:opacity-100 dark:bg-black/50 md:bottom-10 md:opacity-0">
      <FiDownload className="mr-2 cursor-pointer" onClick={handleOnDownload} />
      <FiMaximize className="cursor-pointer" onClick={handleOnMaximize} />
    </div>
  );
}
