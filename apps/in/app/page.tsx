import { HomeBusiness ,JsonLd, organizationLd} from "@solvrex/ui";


export default function Page() {
  return (
    <>
      <JsonLd data={organizationLd()} />
      <HomeBusiness />
    </>
  );
}
