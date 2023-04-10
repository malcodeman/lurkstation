type Props = {
  reset: () => void;
};

export default function Error(props: Props) {
  const { reset } = props;
  return (
    <div className="mt-[46px] flex flex-col items-center p-4">
      <h1 className="text-4xl mb-4">Something went wrong 🔥</h1>
      <button
        className="px-4 py-2 font-semibold text-sm rounded-full bg-[#04BF55] text-[#F2F2F2]"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
