import { Button } from "@/components/Button";

type Props = {
  reset: () => void;
};

export default function Error(props: Props) {
  const { reset } = props;
  return (
    <div className="flex flex-col items-center p-4 sm:mt-[45px]">
      <h1 className="mb-4 text-4xl ">Something went wrong 🔥</h1>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
