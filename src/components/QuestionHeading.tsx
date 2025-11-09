import parse from "html-react-parser";

type QuestionHeadingProps = {
  title: string;
  text?: string;
};
export default function QuestionHeading({ title, text }: QuestionHeadingProps) {
  return (
    <div className="mb-8 space-y-4 text-center">
      <h1 className="text-3xl font-semibold md:text-4xl">{title}</h1>
      {text && <p className="text-center">{parse(text)}</p>}
    </div>
  );
}
