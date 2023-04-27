import { Button } from "@/components/Button";

type Props = {
  statusCode: string;
};

export default function ServerError(props: Props) {
  const { statusCode } = props;

  const getMessage = (code: string) => {
    switch (code) {
      case "Not Found":
        return "This account has been banned or the username is incorrect.";
      case "Forbidden":
        return "This account has been suspended.";
      case "Internal":
      default:
        return "Internal server error";
    }
  };

  return (
    <div className="flex h-[calc(100vh_-_45px)] flex-col items-center justify-center p-4">
      <h2 className="mb-4 text-lg">{getMessage(statusCode)}</h2>
      <Button as="link" href="/">
        Go home
      </Button>
    </div>
  );
}
