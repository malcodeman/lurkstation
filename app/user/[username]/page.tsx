import Posts from "@/app/_components/Posts";

type Props = {
  params: { username: string };
  searchParams: { sort: string; t: string };
};

export default function User(props: Props) {
  const { params, searchParams } = props;
  const username = params.username;
  const sort = searchParams.sort;
  const time = searchParams.t;
  const queryKey = ["users", username, sort, time];

  return <Posts queryKey={queryKey} />;
}
