import parse from "html-react-parser";

type QuestionCommonHeadingProps = {
  title: string;
  text?: string;
};
export default function QuestionCommonHeading({
  title,
  text,
}: QuestionCommonHeadingProps) {
  return (
    <div className="mb-8 space-y-4 text-center">
      <h1 className="text-2xl">{title}</h1>
      {text && <p className="text-center">{parse(text)}</p>}
    </div>
  );
}
