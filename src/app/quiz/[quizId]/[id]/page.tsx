import QuestionScreen from "@/components/QuestionScreen";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <QuestionScreen id={id} />;
}
