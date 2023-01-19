import "./BackgroundOne.css";

interface Props {
  children: React.ReactNode;
}

export default function BackgroundOne({ children }: Props) {
  return <div className="background-one-container">{children}</div>;
}
