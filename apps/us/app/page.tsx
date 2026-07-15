import { Home , JsonLd, organizationLd} from "@solvrex/ui";


export default function Page() {
  return (
    <>
      <JsonLd data={organizationLd()} />
      <Home />
    </>
  );
}
