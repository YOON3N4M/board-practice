import Navigator from "./Navigator";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navigator />
      {children}
    </>
  );
}
