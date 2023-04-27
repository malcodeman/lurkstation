import { Button } from "@/components/Button";

type Props = {
  reset: () => void;
};

export default function Error(props: Props) {
  const { reset } = props;
  return (
    <div className="flex h-[calc(100vh_-_45px)] flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-4xl">Something went wrong 🔥</h1>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
