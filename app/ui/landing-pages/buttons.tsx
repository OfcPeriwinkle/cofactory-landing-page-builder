import Link from 'next/link';
import { Button } from '@heroui/button';

export function DashboardButton() {
  return (
    <Link href={`/dashboard`}>
      <Button color="primary">Return to Dashboard</Button>
    </Link>
  );
}

export function ViewButton({ landingPageId }: { landingPageId: string }) {
  return (
    <Link href={`/landing-pages/${landingPageId}/view`}>
      <Button color="primary">View Page</Button>
    </Link>
  );
}

export function EditButton({ landingPageId }: { landingPageId: string }) {
  return (
    <Link href={`/landing-pages/${landingPageId}/edit`}>
      <Button color="primary">Edit Page</Button>
    </Link>
  );
}
