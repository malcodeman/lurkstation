import { Button } from "@/components/Button";

type Props = {
  reason: string;
};

export default function ServerError(props: Props) {
  const { reason } = props;

  const getMessage = () => {
    switch (reason) {
      case "private":
        return "This is a private community. Only approved members can view and contribute.";
      default:
        return "Internal server error";
    }
  };

  return (
    <div className="flex h-[calc(100vh_-_49px)] flex-col items-center justify-center p-4">
      <h2 className="mb-4 text-lg">{getMessage()}</h2>
      <Button as="link" href="/">
        Go home
      </Button>
    </div>
  );
}
